import {ChromeStorage} from "../shared/utilities/chrome-storage";
import {IpcContent} from "./ipc-content";
import {ActionType} from "../shared/enums/action-type";

const torrentRegex = new RegExp(/([\][]|\b|\.|-|\s)\.torrent\b([^-]|$)/);

function registerLinks(): void {
    const elementArray = document.getElementsByTagName("a");
    const linkArray: HTMLAnchorElement[] = [];

    torrentRegex.lastIndex = 0;
    for (const element of elementArray) {
        if (element.href.includes("magnet") || torrentRegex.test(element.href)) {
            linkArray.push(element);
        }
    }

    const listener: (event: MouseEvent) => void = (event) => {
        if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
            event.preventDefault();
        }

        IpcContent.addTorrent((event.currentTarget as HTMLAnchorElement).href);
    };

    for (const link of linkArray) {
        link.addEventListener("click", listener);
    }
}

function waitForBackground(): void {
    IpcContent.sendMessage("ping", response => {
        if (chrome.runtime.lastError) {
            setTimeout(waitForBackground, 1000);
            return;
        }

        console.log("[torrent2box - content] Connected to background");

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
        });

        ChromeStorage.load().then((result) => {
            registerLinks();
            console.log("[torrent2box - content] Registered links");
        }).catch((reason) => {
            console.log("[torrent2box - content] No seed box specified");
        });
    });
}

waitForBackground();
