<template>
  <div class="fixed top-0 right-0 mt-20 mr-6">
    <div v-for="toast in toasterService.toastArray"
         class="flex rounded items-center px-6 py-4 mb-2 text-base text-white"
         :class="toast.cssClass">
      <component :is="toast.iconComponent" class="h-8 w-8 text-white pr-2"></component>
      <button @click="toasterService.removeToast(toast)"></button>
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
