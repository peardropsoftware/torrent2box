<template>
  <div>
    <h1 class="text-2xl font-semibold">Help</h1>
    <p class="text-base pb-2">Please report any bugs, ask any questions or suggest new features by creating an issue
      on the <a class="font-semibold text-blue-500 hover:underline" href="https://github.com/peardropsoftware/torrent2box/issues" target="_blank">issue tracker</a>.</p>
    <h1 class="text-2xl font-semibold">Changelog</h1>
    <p class="text-base pb-2">Details of the most recent changes are available in the <a class="font-semibold text-blue-500 hover:underline" href="https://github.com/peardropsoftware/torrent2box/blob/master/CHANGELOG.md" target="_blank">changelog</a>.</p>
    <h1 class="text-2xl font-semibold">Source code</h1>
    <p class="text-base pb-2">torrent2box is open source and the source code is available on <a class="font-semibold text-blue-500 hover:underline" href="https://github.com/peardropsoftware/torrent2box" target="_blank">Github</a>.</p>
    <h1 class="text-2xl font-semibold">Icon</h1>
    <p class="text-base pb-2">Icon image gratefully obtained from <a class="font-semibold text-blue-500 hover:underline" href="https://commons.wikimedia.org/wiki/File:Antu_qbittorrent.svg" target="_blank">Wikimedia</a>
      (Creative Commons).</p>
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

