import {ActionType} from "../shared/enums/action-type";

export class IpcBackground {
    static sendMessage(text: string, responseCallback?: ResponseCallback): void {
        chrome.tabs.query({active: true}, (result) => {
            chrome.tabs.sendMessage(result[0].id!, {
                actionType: ActionType.Message,
                text: text
            }, responseCallback);
        });
    }
}
