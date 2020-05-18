<template>
  <div id="app-component">
    <toaster-component></toaster-component>
    <options-form-component></options-form-component>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import OptionsFormComponent from "./components/options-form-component.vue";
    import ToasterComponent from "./components/toaster-component.vue";

    @Component({
        name: "app-component",
        components: {
            "toaster-component": ToasterComponent,
            "options-form-component": OptionsFormComponent
        }
    })
    export default class AppComponent extends Vue {
        // Empty
    }
</script>
