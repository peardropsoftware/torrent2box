<template>
  <div id="sticky-footer">
    <!-- Empty -->
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        name: "navbar-component"
    })
    export default class StickyFooterComponent extends Vue {
        // Empty
    }
</script>

<style lang="scss">
  #sticky-footer {
    background: $peardrop-green-light;
    height: 2rem;
    border-top: 1px solid black;
  }
</style>
