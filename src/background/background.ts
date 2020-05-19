import {ActionType} from "../shared/enums/action-type";
import Axios, {AxiosInstance} from "axios";
import {ChromeStorage} from "../shared/utilities/chrome-storage";
import {IpcBackground} from "./ipc-background";
import {IconType} from "../shared/enums/icon-type";
import InstalledDetails = chrome.runtime.InstalledDetails;

const axios: AxiosInstance = Axios.create();

function createNotification(iconType: IconType, title: string, body: string): void {
    chrome.notifications.create({
        title: title,
        iconUrl: iconType,
        type: "basic",
        message: body
    }, (notificationId) => {
        setTimeout(() => chrome.notifications.clear(notificationId),5000);
    });
}

async function sendFileToSeedBox(fileName: string, torrentFile: Blob): Promise<void> {
    const options = await ChromeStorage.load();
    const serverAddTorrentUrl = new URL(`${options.serverUrl}/php/addtorrent.php`
        // Strip duplicate forward slashes
        .replace(/([^:]\/)\/+/g, "$1"));

    const formData = new FormData();
    formData.append("torrent_file", torrentFile, fileName);
    axios.post(serverAddTorrentUrl.href, formData, {
        auth: {
            username: options.userName,
            password: options.password
        }
    }).then((response) => {
        // Success
        if (/.*addTorrentSuccess.*/.exec(response.data) || /.*result\[\]=Success.*/.exec(response.request.responseURL)) {
            // Extract torrent name from file name
            const torrentName: string = fileName.replace(".torrent", "");
            createNotification(IconType.Success, "[torrent2box] Added torrent:", torrentName);
            return;
        }

        // Error
        console.log(`[torrent2box - background] Error: ${response.data ? response.data : "Unknown error"}`);
        IpcBackground.sendMessage(`Error: ${response.data ? response.data : "Unknown error"}`);
        createNotification(IconType.Error, "[torrent2box] Error:", response.data ? response.data : "Unknown error");
    }).catch((error) => {
        console.log(`[torrent2box - background] Error: ${error.toString()}`);
        IpcBackground.sendMessage(error.toString());
        createNotification(IconType.Error, "[torrent2box] Error:", error.toString());
    });
}

async function sendMagnetToSeedBox(magnetUrl: URL): Promise<void> {
    const options = await ChromeStorage.load();
    const serverAddTorrentUrl = new URL(`${options.serverUrl}/php/addtorrent.php`
        // Strip duplicate forward slashes
        .replace(/([^:]\/)\/+/g, "$1"));

    const formData = new FormData();
    formData.append("url", magnetUrl.href);
    axios.post(serverAddTorrentUrl.href, formData, {
        auth: {
            username: options.userName,
            password: options.password
        }
    }).then((response) => {
        // Success
        if (/.*addTorrentSuccess.*/.exec(response.data) || /.*result\[\]=Success.*/.exec(response.request.responseURL)) {
            // Extract torrent name from magnet url
            const torrentName = magnetUrl.searchParams.get("dn");
            createNotification(IconType.Success, "[torrent2box] Added torrent:", torrentName !== null ? torrentName : "Unknown magnet url");
            return;
        }

        // Error
        console.log(`[torrent2box - background] Error: ${response.data ? response.data : "Unknown error"}`);
        IpcBackground.sendMessage(`Error: ${response.data ? response.data : "Unknown error"}`);
        createNotification(IconType.Error, "[torrent2box] Error:", response.data ? response.data : "Unknown error");
    }).catch((error) => {
        console.log(`[torrent2box - background] Error: ${error.toString()}`);
        IpcBackground.sendMessage(error.toString());
        createNotification(IconType.Error, "[torrent2box] Error:", error.toString());
    });
}

function addTorrent(torrentUrl: URL): void {
    if (!torrentUrl) {
        console.log(`[torrent2box - background] Error: torrentUrl is null`);
        IpcBackground.sendMessage("Error: torrentUrl is null");
        createNotification(IconType.Error, "[torrent2box] Error:", "torrentUrl is null");
    }

    if (torrentUrl.protocol === "magnet:") {
        sendMagnetToSeedBox(torrentUrl);
        return;
    }

    let fileName: string = "file.torrent";
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
            sendFileToSeedBox(fileName, response.data);
            return;
        }

        // Error
        console.log(`[torrent2box - background] Error: ${response.data ? response.data : "Unknown error"}`);
        IpcBackground.sendMessage(`Error: ${response.data ? response.data : "Unknown error"}`);
        createNotification(IconType.Error, "[torrent2box] Error:", response.data ? response.data : "Unknown error");
    }).catch((error) => {
        console.log(`[torrent2box - background] Error: ${error.toString()}`);
        IpcBackground.sendMessage(error.toString());
        createNotification(IconType.Error, "[torrent2box] Error:", error.toString());
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
    chrome.runtime.openOptionsPage();
});
