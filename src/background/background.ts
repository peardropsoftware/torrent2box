import {ActionType} from "../shared/enums/ActionType";
import Axios, {AxiosError, AxiosInstance} from "axios";
import {ChromeStorage} from "../shared/utilities/ChromeStorage";
import {IpcBackground} from "./IpcBackground";
import {IconType} from "../shared/enums/IconType";
import {decode} from "bencode";
import {blobToBuffer} from "./blob-to-buffer";
import InstalledDetails = chrome.runtime.InstalledDetails;

const axios: AxiosInstance = Axios.create();

function notify(iconType: IconType, message: string) {
    console.log(`[torrent2box - background]: ${message}`);
    IpcBackground.sendMessage(message);
    createNotification(iconType, "[torrent2box]", message);
}

function createNotification(iconType: IconType, title: string, body: string): void {
    chrome.notifications.create({
        title: title,
        iconUrl: iconType,
        type: "basic",
        message: body
    }, (notificationId) => {
        setTimeout(() => chrome.notifications.clear(notificationId), 5000);
    });
}

async function extractTorrentNameFromFile(torrentFile: Blob, fileName: string): Promise<string> {
    const decodedTorrent = decode(await blobToBuffer(torrentFile), undefined, undefined, "utf8");
    if (decodedTorrent.info.name) {
        return decodedTorrent.info.name as string;
    }

    if (fileName !== "nameless.torrent") {
        return fileName.replace(".torrent", "");
    } else {
        return "Nameless torrent file";
    }
}

async function sendFileToSeedBox(fileName: string, torrentFile: Blob): Promise<void> {
    const options = await ChromeStorage.load();
    const formData = new FormData();
    const torrentName = await extractTorrentNameFromFile(torrentFile, fileName);
    formData.append("torrent_file", torrentFile, fileName);
    axios.post(options.getServerAddTorrentUrl().href, formData, {
        auth: {
            username: options.userName,
            password: options.password
        }
    }).then((response) => {
        // Success
        if (/.*addTorrentSuccess.*/.exec(response.data) || /.*result\[\]=Success.*/.exec(response.request.responseURL)) {
            notify(IconType.Success, torrentName);
            return;
        }

        // Error
        notify(IconType.Error, response.data ? response.data : "Unknown error");
    }).catch((error: AxiosError) => {
        if (error.response) {
            // ruTorrent may return an error code (e.g. a 404) but still report success
            if (/.*addTorrentSuccess.*/.exec(error.response.data) || /.*result\[\]=Success.*/.exec(error.response.request.responseURL)) {
                notify(IconType.Success, torrentName);
                return;
            }
        }

        notify(IconType.Error, error.toString());
    });
}

async function sendMagnetToSeedBox(magnetUrl: URL): Promise<void> {
    const options = await ChromeStorage.load();
    const formData = new FormData();
    formData.append("url", magnetUrl.href);

    // Extract torrent name from magnet url
    let torrentName = magnetUrl.searchParams.get("dn");
    if (!torrentName) {
        torrentName = "Nameless magnet URL";
    }

    axios.post(options.getServerAddTorrentUrl().href, formData, {
        auth: {
            username: options.userName,
            password: options.password
        }
    }).then((response) => {
        // Success
        if (/.*addTorrentSuccess.*/.exec(response.data) || /.*result\[\]=Success.*/.exec(response.request.responseURL)) {
            notify(IconType.Success, torrentName!);
            return;
        }

        // Error
        notify(IconType.Error, response.data ? response.data : "Unknown error");
    }).catch((error: AxiosError) => {
        if (error.response) {
            // ruTorrent may return an error code (e.g. a 404) but still report success
            if (/.*addTorrentSuccess.*/.exec(error.response.data) || /.*result\[\]=Success.*/.exec(error.response.request.responseURL)) {
                notify(IconType.Success, torrentName!);
                return;
            }
        }

        notify(IconType.Error, error.toString());
    });
}

function addTorrent(torrentUrl: URL): void {
    if (!torrentUrl) {
        notify(IconType.Error, "torrentUrl is null");
    }

    if (torrentUrl.protocol === "magnet:") {
        void sendMagnetToSeedBox(torrentUrl);
        return;
    }

    let fileName: string = "nameless.torrent";
    const regExpResult = /\/([^/]+.torrent)$/.exec(torrentUrl.href);
    if (regExpResult) {
        fileName = regExpResult[1];
    }

    // Download torrent file
    axios({
        method: "get",
        url: torrentUrl.href,
        responseType: "blob"
    }).then((response) => {
        // Success
        if (response.data instanceof Blob) {
            void sendFileToSeedBox(fileName, response.data);
            return;
        }

        // Error
        notify(IconType.Error, response.data ? response.data : "Unknown error");
    }).catch((error: AxiosError) => {
        notify(IconType.Error, error.toString());
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message.actionType) {
        throw new Error("No action specified");
    }

    switch (message.actionType as ActionType) {
        case ActionType.Message:
            if (message.text === "ping") {
                sendResponse({
                    action: ActionType.Message,
                    text: "pong"
                });
                return;
            } else {
                console.log(`[torrent2box - content] ${message.text}`);
            }
            break;
        case ActionType.Notify:
            IpcBackground.sendMessage("createNotification()");
            createNotification(message.iconType, message.title, message.body);
            break;
        case ActionType.AddTorrent:
            IpcBackground.sendMessage("addTorrent()");
            addTorrent(new URL(message.torrentUrl));
            break;
        default:
            throw new Error("Invalid action type");
    }
});

chrome.runtime.onInstalled.addListener((details: InstalledDetails) => {
    console.log("[torrent2box - background] onInstalled()");
    if (details.reason === "install" || process.env.mode === "development") {
        chrome.runtime.openOptionsPage();
    }
});
