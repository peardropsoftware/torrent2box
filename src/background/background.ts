import "crx-hotreload";
import {ActionType} from "../shared/action-type";
import InstalledDetails = chrome.runtime.InstalledDetails;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => sendResponse("pong"));

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(response => {
            if (!response.action) {
                throw new Error("No action specified");
            }

            switch (response.action as ActionType) {
                case ActionType.Message:
                    console.log(response.message);
                    break;
                case ActionType.AddTorrent:
                    // Perform axios request
                    break;
                default:
                    throw new Error("Invalid action type");
            }
        }
    );

    port.postMessage({
        action: ActionType.Message,
        message: "Connected to content"
    });
});

chrome.runtime.onInstalled.addListener((details: InstalledDetails) => {
    console.log("onInstalled()");
});
