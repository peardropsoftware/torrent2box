<template>
  <div v-if="errorMessage" class="mt-4">
    <div class="p-2 font-bold bg-red-600 text-white text-lg">
      Error
    </div>
    <div class="px-2 py-4 bg-red-100 text-red-800 text-base">
      {{errorMessage}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";

@Component({
    name: "form-error-message"
})
export default class FormErrorMessage extends Vue {
    @Prop({required: true}) errorMessage: string;
}
</script>
