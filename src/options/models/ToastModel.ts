export class ToastModel {
    message: string;
    cssClass: string;
    iconCssClass: string;

    constructor(message: string, cssClass: string, iconCssClass: string) {
        this.message = message;
        this.cssClass = cssClass;
        this.iconCssClass = iconCssClass;
    }
}
