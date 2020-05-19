// Extend Vue typings
import {Vue} from "vue/types/vue";

declare module "vue/types/vue" {
    interface Vue {
        // Empty
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        // Empty
    }
}
