import {IsNotEmpty, IsUrl} from "class-validator-fork";

export class OptionsModel {
    @IsNotEmpty()
    @IsUrl()
    serverUrl: string;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    linkMatcher: string;

    constructor() {
        this.linkMatcher = "(\\.torrent\\b|torrents\\.php\\?action=download)";
    }

    getServerAddTorrentUrl(): URL {
        if (!this.serverUrl) {
            throw new Error("serverUrl not defined");
        }

        return new URL(`${this.serverUrl}/php/addtorrent.php`
            // Strip duplicate forward slashes
            .replace(/([^:]\/)\/+/g, "$1"));
    }

    getLinkMatcherRegExp(): RegExp {
        return new RegExp(this.linkMatcher);
    }
}
