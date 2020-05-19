<template>
  <div id="title-bar" class="is-success">
    <div class="is-centered level-item">
      <img class="logo" src="images/icon-purple-48.png" alt="torrent2box">
      <h1 class="title">torrent2box</h1>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        name: "navbar-component"
    })
    export default class NavbarComponent extends Vue {
        // Empty
    }
</script>

<style lang="scss">
  #title-bar {
    background-color: #00D1B2;
    border-bottom: 1px solid black;
    padding: 1rem;

    h1 {
      color: white;
    }

    .logo {
      padding-right: 1rem;
    }
  }
</style>
