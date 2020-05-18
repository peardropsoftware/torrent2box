export class ChromeStorage {
    static async load(key: string): Promise<object> {
        return new Promise<any>((resolve, reject) => {
            if (!key) {
                reject("Key cannot be null or undefined.");
            }

            chrome.storage.local.get("torrent2box", (items) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }

                resolve(JSON.parse(items as any as string));
            });
        });
    }

    static async save(key: string, payload: object): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!key) {
                reject("Key cannot be null or undefined.");
            }

            chrome.storage.local.set({
                torrent2box: JSON.stringify(payload)
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }
}
