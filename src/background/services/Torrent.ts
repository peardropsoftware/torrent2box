import {decode} from "bencode";
import {IconType} from "../../shared/enums/IconType";
import {ChromeStorage} from "../../shared/services/ChromeStorage";
import {webFetchNoHooks} from "../utilities/web-fetch-no-hooks";
import {ChromeNotify} from "./ChromeNotify";
import {OptionsModel} from "../../shared/models/OptionsModel";
import {httpStatusTextByCode} from "http-status-ts";
import {blobToBuffer} from "../utilities/blob-to-buffer";

export abstract class Torrent {
    static async extractTorrentNameFromFile(torrentFile: Blob, fileName: string): Promise<string> {
        const decodedTorrent = decode(await blobToBuffer(torrentFile), undefined, undefined, "utf8");

        if (decodedTorrent.info.name) {
            return decodedTorrent.info.name as string;
        }

        if (fileName !== "nameless.torrent") {
            return fileName.replace(".torrent", "");
        }

        return "Nameless torrent file";
    }

    static async sendDataToSeedBox(options: OptionsModel, formData: FormData, torrentName: string): Promise<void> {
        try {
            const base64Credentials = btoa(`${options.userName}:${options.password}`);
            const response = await webFetchNoHooks.post(options.getServerAddTorrentUrl().href, {
                body: formData,
                headers: {
                    "Authorization": `Basic ${base64Credentials}`
                }
            });
            const result = await response.text();

            // Success
            if (/.*addTorrentSuccess.*/.exec(result) || /.*result\[\]=Success.*/.exec(response.url)) {
                ChromeNotify.createNotification(IconType.Success, torrentName);
                return;
            }

            // Error
            if (response.ok) {
                ChromeNotify.createNotification(IconType.Error, result ? result : "Error sending torrent data to seedbox");
            } else {
                const httpErrorText = `Error ${response.status}: ${httpStatusTextByCode(response.status)}`;
                ChromeNotify.createNotification(IconType.Error, httpErrorText);
            }
        } catch (error) {
            // Error
            ChromeNotify.createNotification(IconType.Error, error.message ? error.message : "Unknown error");
        }
    }

    static async sendFileToSeedBox(fileName: string, torrentFile: Blob): Promise<void> {
        const options = await ChromeStorage.load();
        const formData = new FormData();
        const torrentName = await Torrent.extractTorrentNameFromFile(torrentFile, fileName);
        formData.append("torrent_file", torrentFile, fileName);
        await Torrent.sendDataToSeedBox(options, formData, torrentName);
    }

    static async sendMagnetToSeedBox(options: OptionsModel, magnetUrl: URL): Promise<void> {
        const formData = new FormData();

        // Extract torrent name from magnet url
        let torrentName = magnetUrl.searchParams.get("dn");
        if (!torrentName) {
            torrentName = "Nameless magnet URL";
        }

        formData.append("url", magnetUrl.href);
        await Torrent.sendDataToSeedBox(options, formData, torrentName);
    }

    static async addTorrent(torrentUrl: URL): Promise<void> {
        const options = await ChromeStorage.load();

        if (!torrentUrl) {
            ChromeNotify.createNotification(IconType.Error, "torrentUrl is null");
        }

        if (torrentUrl.protocol === "magnet:") {
            await Torrent.sendMagnetToSeedBox(options, torrentUrl);
            return;
        }

        let fileName: string = "nameless.torrent";
        const regExpResult = /\/([^/]+.torrent)$/.exec(torrentUrl.href);
        if (regExpResult) {
            fileName = regExpResult[1];
        }

        try {
            // Download torrent file
            const response = await webFetchNoHooks.get(torrentUrl.href);
            const result = await response.blob();

            // Success
            if (response.ok && result instanceof Blob) {
                await Torrent.sendFileToSeedBox(fileName, result);
                return;
            }

            // Error
            ChromeNotify.createNotification(IconType.Error, httpStatusTextByCode(response.status));
        } catch (error) {
            ChromeNotify.createNotification(IconType.Error, error.message ? error.message : "Unknown error");
        }
    }

}
