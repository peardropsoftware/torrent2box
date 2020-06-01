<template>
  <div id="title-bar">
    <div id="title" class="is-centered level-item">
      <img class="logo" src="images/icon-green-48.png" alt="torrent2box">
      <div class="section is-paddingless">
        <h1 id="name" class="title">torrent2box</h1>
        <p id="version">version: v{{version}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        name: "title-bar"
    })
    export default class TitleBar extends Vue {
        version: string = "";

        mounted(): void {
            this.version = chrome.runtime.getManifest().version;
        }
    }
</script>

<style lang="scss">
  #title-bar {
    background: $t2b-blue-medium;
    border-bottom: 1px solid black;
    padding: 1rem;
    margin-bottom: 1rem;

    #name, #version {
      color: white;
    }

    #version {
      padding-left: 2.5rem;
    }

    .logo {
      padding-right: 1rem;
    }
  }
</style>
