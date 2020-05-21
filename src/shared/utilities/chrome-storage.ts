import {OptionsModel} from "../models/options-model";

export class ChromeStorage {
    static async load(): Promise<OptionsModel> {
        return new Promise<OptionsModel>((resolve, reject) => {
            chrome.storage.local.get("torrent2box", (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }

                if (!items.torrent2box) {
                    return reject("Storage is empty");
                }

                return resolve(JSON.parse(items.torrent2box));
            });
        });
    }

    static async save(payload: OptionsModel): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            chrome.storage.local.set({
                torrent2box: JSON.stringify(payload)
            }, () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                } else {
                    return resolve();
                }
            });
        });
    }
}
