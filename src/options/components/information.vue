<template>
  <div id="information">
    <h1 class="title is-4">Help</h1>
    <p>Please report any bugs, ask any questions or suggest new features by creating an issue
      on the <a href="https://github.com/peardropsoftware/torrent2box/issues" target="_blank">issue tracker</a>.</p>
    <h1 class="title is-4">Changelog</h1>
    <p>Details of the most recent changes are available in the <a href="https://github.com/peardropsoftware/torrent2box/blob/master/CHANGELOG.md" target="_blank">changelog</a>.</p>
    <h1 class="title is-4">Source code</h1>
    <p>torrent2box is open source and the source code is available on <a href="https://github.com/peardropsoftware/torrent2box" target="_blank">Github</a>.</p>
    <h1 class="title is-4">Icon</h1>
    <p>Icon image gratefully obtained from <a href="https://commons.wikimedia.org/wiki/File:Antu_qbittorrent.svg" target="_blank">Wikimedia</a>
      (Creative Commons).</p>
    <div id="spacer"></div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        name: "information"
    })
    export default class Information extends Vue {
        // Empty
    }
</script>

<style lang="scss">
  #information {
    background-color: $t2b-gray-lightest;

    h1 {
      margin: 0;
      padding: 0.5rem 0;
    }

    a:hover {
      color: blue;
      text-decoration: underline;
    }

    #spacer {
      width: 1rem;
      height: 9.4rem;
    }
  }
</style>
