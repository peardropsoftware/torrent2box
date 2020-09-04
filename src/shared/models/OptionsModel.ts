import {IsNotEmpty, IsRegEx, IsUrl} from "meta-validator";

export class OptionsModel {
    @IsNotEmpty()
    @IsUrl()
    serverUrl: string;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;

    @IsRegEx()
    @IsNotEmpty()
    linkMatcher: string;

    constructor() {
        this.linkMatcher = this.getDefaultLinkMatcher();
    }

    getServerAddTorrentUrl(): URL {
        if (!this.serverUrl) {
            throw new Error("serverUrl not defined");
        }

        // Normalize URL
        return new URL(`${this.serverUrl}/php/addtorrent.php`.replace(/([^:]\/)\/+/g, "$1"));
    }

    getLinkMatcherRegExp(): RegExp {
        return new RegExp(this.linkMatcher, "gim");
    }

    getDefaultLinkMatcher(): string {
        return "(\\.torrent\\b|torrents\\.php\\?action=download)";
    }
}
