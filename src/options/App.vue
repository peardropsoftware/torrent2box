<script lang="ts">
import {defineComponent} from "vue";
import Toaster from "./components/Toaster.vue";
import TitleBar from "./components/TitleBar.vue";
import Tabs from "./components/Tabs.vue";
import StickyFooter from "./components/Footer.vue";

export default defineComponent({
    name: "App",
    components: {
        Toaster,
        TitleBar,
        Tabs,
        StickyFooter
    }
});
</script>

<template>
  <div class="antialiased font-sans text-gray-900 bg-gray-300">
    <div class="flex flex-col min-h-screen">
      <toaster></toaster>
      <title-bar></title-bar>
      <tabs></tabs>
      <div class="flex-grow"></div>
      <sticky-footer></sticky-footer>
    </div>
  </div>
</template>
