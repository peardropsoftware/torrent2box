import {OptionsDto} from "../dtos/OptionsDto";

export class ChromeStorage {
    static load(): Promise<OptionsDto> {
        return new Promise<OptionsDto>((resolve, reject) => {
            chrome.storage.local.get("torrent2box", (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }

                if (!items["torrent2box"]) {
                    return reject(new Error("Storage is empty"));
                }

                return resolve(Object.assign(new OptionsDto(), JSON.parse(items["torrent2box"])));
            });
        });
    }

    static save(payload: OptionsDto): Promise<void> {
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
