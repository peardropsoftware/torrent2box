<template>
  <div class="fixed z-50" style="top: 3rem; right: 3rem;">
    <div v-for="toast in toasterService.toastArray"
         class="flex rounded items-center px-6 py-4 mb-2 text-base text-white cursor-pointer"
         :class="toast.cssClass" @click="toasterService.removeToast(toast)">
      <svg class="h-8 w-8 text-white pr-2">
        <use :href="toast.iconSrc" />
      </svg>
      {{toast.message}}
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {ToasterService} from "../services/ToasterService";

    @Component({
        name: "toaster"
    })
    export default class Toaster extends Vue {
        toasterService: ToasterService = new ToasterService();
    }
</script>

<style scoped>
#toaster {
    position: fixed;
    top: 5.5rem;
    right: 0;
    z-index: 100;
}
</style>
