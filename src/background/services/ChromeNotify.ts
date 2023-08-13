import {IconType} from "../../shared/enums/IconType.js";
import {IpcBackground} from "./IpcBackground.js";

export abstract class ChromeNotify {
    static createNotification(iconType: IconType, body: string): void {
        IpcBackground.sendMessage(body);
        chrome.notifications.create({
            title: "[torrent2box]",
            iconUrl: iconType,
            type: "basic",
            message: body,
            requireInteraction: false
        }, (notificationId) => {
            setTimeout(() => chrome.notifications.clear(notificationId), 6000);
        });
    }
}
