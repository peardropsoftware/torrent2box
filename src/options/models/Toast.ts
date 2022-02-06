export class Toast {
    message: string;
    cssClass: string;
    iconSrc: string;

    constructor(message: string, cssClass: string, iconSrc: string) {
        this.message = message;
        this.cssClass = cssClass;
        this.iconSrc = iconSrc;
    }
}
