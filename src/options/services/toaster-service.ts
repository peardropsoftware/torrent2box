import {ToastModel} from "../models/toast-model";

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
        this.addToast(new ToastModel(message, "is-success", "fa-check"));
    }

    info(message: string): void {
        this.addToast(new ToastModel(message, "is-info", "fa-exclamation-circle"));
    }

    warning(message: string): void {
        this.addToast(new ToastModel(message, "is-warning", "fa-exclamation-triangle"));
    }

    error(message: string): void {
        this.addToast(new ToastModel(message, "is-danger", "fa-times"));
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
