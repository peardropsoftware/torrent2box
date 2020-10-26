import {ToastModel} from "../models/ToastModel";
import IconCheck from "../components/icons/IconCheck.vue";
import IconExclamation from "../components/icons/IconExclamation.vue";
import IconInformation from "../components/icons/IconInformation.vue";

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
        this.addToast(new ToastModel(message, "bg-green-700", IconCheck));
    }

    info(message: string): void {
        this.addToast(new ToastModel(message, "bg-blue-700", IconInformation));
    }

    warning(message: string): void {
        this.addToast(new ToastModel(message, "bg-orange-700", IconExclamation));
    }

    error(message: string): void {
        this.addToast(new ToastModel(message, "bg-red-700", IconExclamation));
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
