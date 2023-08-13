import {ActionType} from "../shared/enums/ActionType.js";
import {Torrent} from "./services/Torrent.js";
import InstalledDetails = chrome.runtime.InstalledDetails;
import OnInstalledReason = chrome.runtime.OnInstalledReason;

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
            Torrent.addTorrent(new URL(message.torrentUrl))
                .catch(reason => console.error(reason));
            break;
        default:
            throw new Error("Invalid action type");
    }

    // chrome.runtime.onMessage.addListener must always send a response
    // https://stackoverflow.com/a/71520415
    sendResponse();
});

chrome.runtime.onInstalled.addListener((details: InstalledDetails) => {
    console.log("[torrent2box - background] onInstalled()");
    console.log(`[torrent2box - background] process.env.NODE_ENV = ${process.env["NODE_ENV"]}`);
    if (details.reason === OnInstalledReason.INSTALL || process.env["NODE_ENV"] === "development") {
        chrome.runtime.openOptionsPage();
    }
});
