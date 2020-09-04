import {ActionType} from "../../shared/enums/ActionType";

export abstract class IpcBackground {
    static sendMessage(text: string, responseCallback?: ResponseCallback): void {
        console.log(`[torrent2box - background]: ${text}`);
        chrome.tabs.query({active: true}, (result) => {
            chrome.tabs.sendMessage(result[0].id!, {
                actionType: ActionType.Message,
                text: text
            }, responseCallback);
        });
    }
}
