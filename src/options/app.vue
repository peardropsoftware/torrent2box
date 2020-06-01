<template>
  <div class="expand-vertical">
    <toaster></toaster>
    <title-bar></title-bar>
    <tabs></tabs>
    <div class="expand-vertical"></div>
    <sticky-footer></sticky-footer>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TitleBar from "./components/title-bar.vue";
    import Tabs from "./components/tabs.vue";
    import Toaster from "./components/toaster.vue";
    import StickyFooter from "./components/sticky-footer.vue";

    @Component({
        name: "app",
        components: {
            "toaster": Toaster,
            "title-bar": TitleBar,
            "tabs": Tabs,
            "sticky-footer": StickyFooter
        }
    })
    export default class App extends Vue {
        // Empty
    }
</script>
