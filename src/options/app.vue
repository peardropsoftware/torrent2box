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

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TitleBar from "./components/TitleBar.vue";
    import Tabs from "./components/Tabs.vue";
    import Toaster from "./components/Toaster.vue";
    import StickyFooter from "./components/StickyFooter.vue";

    @Component({
        name: "app",
        components: {
            Toaster,
            TitleBar,
            Tabs,
            StickyFooter
        }
    })
    export default class App extends Vue {
        // Empty
    }
</script>
