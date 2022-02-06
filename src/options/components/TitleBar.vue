<script lang="ts">
import {defineComponent, onMounted, Ref, ref} from "vue";

export default defineComponent({
    name: "TitleBar",
    setup() {
        const version: Ref<string> = ref("");

        onMounted(() => {
            version.value = chrome.runtime.getManifest().version;
        });

        return {
            version
        };
    }
});
</script>

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
