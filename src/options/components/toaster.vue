<template>
  <div id="toaster">
    <div v-for="toast in toasterService.toastArray"
         class="notification"
         :class="toast.cssClass">
      <button class="delete" @click="toasterService.removeToast(toast)"></button>
      <span class="icon">
        <i class="fas" :class="toast.iconCssClass"></i>
      </span>
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

<style lang="scss">
  #toaster {
    position: fixed;
    top: 3.3rem;
    right: 0;
    z-index: 100;
  }
</style>
