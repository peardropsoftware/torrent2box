<template>
  <div id="sticky-footer">
    <!-- Empty -->
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        name: "sticky-footer"
    })
    export default class StickyFooter extends Vue {
        // Empty
    }
</script>

<style lang="scss">
  #sticky-footer {
    background: $t2b-blue-medium;
    height: 2rem;
    border-top: 1px solid black;
  }
</style>
