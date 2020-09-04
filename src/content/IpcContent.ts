import {ActionType} from "../shared/enums/ActionType";

export class IpcContent {
    static sendMessage(text: string, responseCallback?: ResponseCallback): void {
        chrome.runtime.sendMessage({
            actionType: ActionType.Message,
            text: text
        }, responseCallback);
    }

    static addTorrent(torrentUrl: string, responseCallback?: ResponseCallback): void {
        chrome.runtime.sendMessage({
            actionType: ActionType.AddTorrent,
            torrentUrl: torrentUrl
        }, responseCallback);
    }
}
