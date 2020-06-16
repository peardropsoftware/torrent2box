import {ChromeStorage} from "../shared/utilities/ChromeStorage";
import {IpcContent} from "./IpcContent";
import {ActionType} from "../shared/enums/ActionType";

const clickEventListener: (event: MouseEvent) => void = (event) => {
    if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        event.preventDefault();
    }

    IpcContent.addTorrent((event.currentTarget as HTMLAnchorElement).href);
};

function registerLink(linkRegExp: RegExp, anchorElement: HTMLAnchorElement) {
    if (!anchorElement.hasAttribute("data-torrent2box")) {
        linkRegExp.lastIndex = 0;
        if (anchorElement.href.includes("magnet") || linkRegExp.test(anchorElement.href)) {
            anchorElement.setAttribute("data-torrent2box", "matched");
            anchorElement.addEventListener("click", clickEventListener);
        }
    }
}

function monitorDom(linkRegExp: RegExp) {
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                // Track only elements, skip other nodes (e.g. text nodes)
                if (!(node instanceof HTMLElement)) {
                    continue;
                }

                // Register links
                if (node.tagName.toLowerCase() === "a") {
                    registerLink(linkRegExp, node as HTMLAnchorElement);
                } else {
                    for (const element of node.getElementsByTagName("a")) {
                        registerLink(linkRegExp, element);
                    }
                }
            }
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

function waitForBackground(): void {
    IpcContent.sendMessage("ping", response => {
        if (chrome.runtime.lastError) {
            setTimeout(waitForBackground, 1000);
            return;
        }

        // console.log("[torrent2box - content] Connected to background");
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
            const linkRegExp = result.getLinkMatcherRegExp();
            // Register static links
            for (const element of document.getElementsByTagName("a")) {
                registerLink(linkRegExp, element);
            }
            // console.log("[torrent2box - content] Registered static links");
            // Monitor DOM for dynamic links
            monitorDom(linkRegExp);
            // console.log("[torrent2box - content] Monitoring for dynamic links");
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
