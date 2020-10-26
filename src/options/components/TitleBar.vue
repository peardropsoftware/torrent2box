<template>
  <div class="flex items-center justify-center p-5 border-black border-b bg-blue-300">
    <div>
      <img class="pr-4" src="images/icon-green-48.png" alt="torrent2box">
    </div>
    <div class="text-white">
      <h1 class="text-3xl font-bold -mb-1">torrent2box</h1>
      <p class="text-center text-base -mt-2">version: v{{version}}</p>
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
