<script lang="ts">
import {defineComponent} from "vue";
import {Toaster} from "../services/Toaster";

export default defineComponent({
    name: "Toaster",
    setup() {
        return {
            Toaster
        };
    }
});
</script>

<template>
  <div class="fixed z-50" style="top: 5.5rem; right: 3rem;">
    <div v-for="toast in Toaster.toasts.value"
         class="flex items-center rounded px-6 py-4 mb-2 text-white cursor-pointer"
         :class="toast.cssClass" @click="toaster.removeToast(toast)">
      <svg class="h-8 w-8 text-white pr-2">
        <use :href="toast.iconSrc" />
      </svg>
      <span>{{toast.message}}</span>
    </div>
  </div>
</template>
