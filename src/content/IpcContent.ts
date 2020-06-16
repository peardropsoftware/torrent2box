import {ActionType} from "../shared/enums/ActionType";
import {IconType} from "../shared/enums/IconType";

export class IpcContent {
    static sendMessage(text: string, responseCallback?: ResponseCallback): void {
        chrome.runtime.sendMessage({
            actionType: ActionType.Message,
            text: text
        }, responseCallback);
    }

    static sendNotification(iconType: IconType, title: string, body: string, responseCallback?: ResponseCallback): void {
        chrome.runtime.sendMessage({
            actionType: ActionType.Notify,
            iconType: iconType,
            title: title,
            body: body
        }, responseCallback);
    }

    static addTorrent(torrentUrl: string, responseCallback?: ResponseCallback): void {
        chrome.runtime.sendMessage({
            actionType: ActionType.AddTorrent,
            torrentUrl: torrentUrl
        }, responseCallback);
    }
}
