<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "FormErrorMessage",
    props: {
        errorMessage: {
            type: String,
            required: true
        }
    }
});
</script>

<template>
  <div v-if="errorMessage" class="mt-4">
    <div class="p-2 rounded-t bg-red-600 text-white text-lg">
      Error
    </div>
    <div class="px-2 rounded-b py-4 bg-red-100 text-red-800 text-base">
      {{errorMessage}}
    </div>
  </div>
</template>
