import {ToastModel} from "../models/ToastModel";

export class ToasterService {
    private static instance: ToasterService;
    toastArray: ToastModel[] = [];

    constructor() {
        if (ToasterService.instance) {
            return ToasterService.instance;
        }

        ToasterService.instance = this;
    }

    success(message: string): void {
        this.addToast(new ToastModel(message, "bg-green-500", "/images/svg/check.svg#check"));
    }

    info(message: string): void {
        this.addToast(new ToastModel(message, "bg-blue-600", "/images/svg/information.svg#information"));
    }

    warning(message: string): void {
        this.addToast(new ToastModel(message, "bg-orange-600", "/images/svg/exclamation.svg#exclamation"));
    }

    error(message: string): void {
        this.addToast(new ToastModel(message, "bg-red-600", "/images/svg/exclamation.svg#exclamation"));
    }

    addToast(toast: ToastModel): void {
        this.toastArray.push(toast);
        setTimeout(() => {
            this.removeToast(toast);
        }, 5000);
    }

    removeToast(toast: ToastModel): void {
        const index = this.toastArray.indexOf(toast);
        if (index >= 0) {
            this.toastArray.splice(index, 1);
        }
    }
}
