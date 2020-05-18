import {ActionType} from "../shared/action-type";
import {ChromeStorage} from "../shared/chrome-storage";

const torrentRegex = new RegExp(/([\][]|\b|\.|-|\s)\.torrent\b([^-]|$)/);

function registerLinks(port: chrome.runtime.Port): void {
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

        console.log("clicked");
        port.postMessage({
            action: ActionType.AddTorrent,
            url: (event.target as HTMLAnchorElement).href
        });
    };

    for (const link of linkArray) {
        link.addEventListener("click", listener);
    }
}

function pingBackground(): void {
    chrome.runtime.sendMessage("ping", response => {
        if (chrome.runtime.lastError) {
            setTimeout(pingBackground, 1000);
            return;
        }

        const port = chrome.runtime.connect({name: "torrent2box"});
        port.postMessage({
            action: ActionType.Message,
            message: "Connected to background"
        });

        port.onMessage.addListener((response) => {
            if (!response.action) {
                throw new Error("No action specified");
            }

            switch (response.action as ActionType) {
                case ActionType.Message:
                    console.log(response.message);
                    break;
                default:
                    throw new Error("Invalid action type");
            }
        });

        ChromeStorage.load("torrent2box").then((result) => {
            registerLinks(port);
        });
    });
}

pingBackground();
