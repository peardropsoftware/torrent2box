import {OptionsModel} from "../models/OptionsModel";

export class ChromeStorage {
    static load(): Promise<OptionsModel> {
        return new Promise<OptionsModel>((resolve, reject) => {
            chrome.storage.local.get("torrent2box", (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }

                if (!items.torrent2box) {
                    return reject(new Error("Storage is empty"));
                }

                return resolve(Object.assign(new OptionsModel(), JSON.parse(items.torrent2box)));
            });
        });
    }

    static save(payload: OptionsModel): Promise<void> {
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
