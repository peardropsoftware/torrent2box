import {Toast} from "../models/Toast";
import {ref, Ref} from "vue";

export abstract class Toaster {
    static toasts: Ref<Toast[]> = ref([]);

    static success(message: string): void {
        Toaster.addToast(new Toast(message, "bg-green-500", "/images/icons/check.svg#check"));
    }

    static info(message: string): void {
        Toaster.addToast(new Toast(message, "bg-blue-500", "/images/icons/information.svg#information"));
    }

    static warning(message: string): void {
        Toaster.addToast(new Toast(message, "bg-orange-500", "/images/icons/exclamation.svg#exclamation"));
    }

    static error(message: string): void {
        Toaster.addToast(new Toast(message, "bg-red-500", "/images/icons/exclamation.svg#exclamation"));
    }

    static addToast(toast: Toast): void {
        Toaster.toasts.value.push(toast);
        setTimeout(() => {
            // Toaster.removeToast(toast);
        }, 6000);
    }

    static removeToast(toast: Toast): void {
        const index = Toaster.toasts.value.indexOf(toast);
        if (index >= 0) {
            Toaster.toasts.value.splice(index, 1);
        }
    }
}
