import {ActionType} from "../shared/enums/ActionType";
import InstalledDetails = chrome.runtime.InstalledDetails;
import {Torrent} from "./services/Torrent";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
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
            await Torrent.addTorrent(new URL(message.torrentUrl));
            break;
        default:
            throw new Error("Invalid action type");
    }
});

chrome.runtime.onInstalled.addListener((details: InstalledDetails) => {
    console.log("[torrent2box - background] onInstalled()");
    if (details.reason === "install" || process.env.mode === "development") {
        chrome.runtime.openOptionsPage();
    }
});
