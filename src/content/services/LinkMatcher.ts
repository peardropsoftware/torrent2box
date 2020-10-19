import {IpcContent} from "../IpcContent";

export abstract class LinkMatcher {
    static clickEventListener(event: MouseEvent): void {
        if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
            event.preventDefault();
        }

        IpcContent.addTorrent((event.currentTarget as HTMLAnchorElement).href);
    }

    static registerLink(linkRegExp: RegExp, anchorElement: HTMLAnchorElement): void {
        if (!anchorElement.hasAttribute("data-torrent2box")) {
            linkRegExp.lastIndex = 0;
            if (anchorElement.href.includes("magnet:?") || linkRegExp.test(anchorElement.href)) {
                anchorElement.setAttribute("data-torrent2box", "matched");
                anchorElement.addEventListener("click", LinkMatcher.clickEventListener);
            }
        }
    }

    static monitorDom(linkRegExp: RegExp): void {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    // Track only elements, skip other nodes (e.g. text nodes)
                    if (!(node instanceof HTMLElement)) {
                        continue;
                    }

                    // Register links
                    if (node.tagName.toLowerCase() === "a") {
                        LinkMatcher.registerLink(linkRegExp, node as HTMLAnchorElement);
                    } else {
                        for (const element of node.getElementsByTagName("a")) {
                            LinkMatcher.registerLink(linkRegExp, element);
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
}
