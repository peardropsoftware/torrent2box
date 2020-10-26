import {Component} from "vue";

export class ToastModel {
    message: string;
    cssClass: string;
    iconComponent: Component;

    constructor(message: string, cssClass: string, iconComponent: Component) {
        this.message = message;
        this.cssClass = cssClass;
        this.iconComponent = iconComponent;
    }
}
