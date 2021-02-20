import {ActionType} from "../shared/enums/ActionType";
import InstalledDetails = chrome.runtime.InstalledDetails;
import {Torrent} from "./services/Torrent";

// Buffer polyfill
import buffer from "buffer";
(window as any).Buffer = buffer.Buffer;

chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
    if (!message.actionType) {
        throw new Error("No action specified");
    }

    switch (message.actionType as ActionType) {
        case ActionType.Message:
            if (message.text === "ping") {
                sendResponse({
                    action: ActionType.Message,
                    text: "pong"
                });

                return;
            }

            console.log(`[torrent2box - content] ${message.text}`);
            break;
        case ActionType.AddTorrent:
            void Torrent.addTorrent(new URL(message.torrentUrl));
            break;
        default:
            throw new Error("Invalid action type");
    }
});

chrome.runtime.onInstalled.addListener((details: InstalledDetails) => {
    console.log("[torrent2box - background] onInstalled()");
    console.log(`[torrent2box - background] process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    if (details.reason === "install" || process.env.NODE_ENV === "development") {
        chrome.runtime.openOptionsPage();
    }
});
