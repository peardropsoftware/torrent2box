<template>
  <div id="app-component" class="expand-vertical">
    <toaster-component></toaster-component>
    <title-bar-component></title-bar-component>
    <options-form-component class="expand-vertical"></options-form-component>
    <sticky-footer-component></sticky-footer-component>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import TitleBarComponent from "./components/title-bar-component.vue";
    import OptionsFormComponent from "./components/options-form-component.vue";
    import ToasterComponent from "./components/toaster-component.vue";
    import StickyFooterComponent from "./components/sticky-footer.vue";

    @Component({
        name: "app-component",
        components: {
            "toaster-component": ToasterComponent,
            "title-bar-component": TitleBarComponent,
            "options-form-component": OptionsFormComponent,
            "sticky-footer-component": StickyFooterComponent
        }
    })
    export default class AppComponent extends Vue {
        // Empty
    }
</script>

