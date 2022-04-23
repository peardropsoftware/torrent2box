import {ChromeStorage} from "../shared/services/ChromeStorage";
import {IpcContent} from "./IpcContent";
import {ActionType} from "../shared/enums/ActionType";
import {LinkMatcher} from "./services/LinkMatcher";

function waitForBackground(): void {
    IpcContent.sendMessage("ping", response => {
        if (chrome.runtime.lastError) {
            setTimeout(waitForBackground, 1000);
            return;
        }

        // console.log("[torrent2box - content] Connected to background");
        chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
            if (!message.actionType) {
                throw new Error("No action specified");
            }

            switch (message.actionType as ActionType) {
                case ActionType.Message:
                    if (message.text !== "pong") {
                        console.log(`[torrent2box - background] ${message.text}`);
                    }
                    break;
                default:
                    throw new Error("Invalid action type");
            }

            // chrome.runtime.onMessage.addListener must always send a response
            // https://stackoverflow.com/a/71520415
            sendResponse();
        });

        ChromeStorage.load().then((result) => {
            const linkRegExp = result.getLinkMatcherRegExp();
            // Register static links
            for (const element of document.getElementsByTagName("a")) {
                LinkMatcher.registerLink(linkRegExp, element);
            }
            // Monitor DOM for dynamic links
            LinkMatcher.monitorDom(linkRegExp);
            console.log("[torrent2box] Activated");
        }).catch((error) => {
            console.log("[torrent2box - content] Links not registered");
            if (error.message) {
                console.log(`[torrent2box - content] ${error.message}`);
            }
        });
    });
}

waitForBackground();
