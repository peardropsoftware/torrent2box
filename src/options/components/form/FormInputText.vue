<template>
  <div class="mb-4">
    <label class="text-base font-bold" :for="label | paramCase">{{label}}</label>
    <div class="flex items-center relative">
      <input :id="label | paramCase"
             class="w-full py-1 px-10 text-base rounded my-1"
             :type="inputType"
             :value="value"
             :class="{ 'border-2 border-red-500': validationErrors, 'border-2 border-green-500': !validationErrors && value }"
             @input="$emit('input', $event.target.value)" />
      <slot></slot>
      <icon-check v-if="!validationErrors && value" class="form-validation-icon text-green-500"></icon-check>
      <icon-exclamation v-if="validationErrors" class="form-validation-icon text-red-500"></icon-exclamation>
    </div>
    <ul class="text-sm text-red-700">
      <li v-for="validationError in validationErrors">{{validationError}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import IconCheck from "../icons/IconCheck.vue";
import IconExclamation from "../icons/IconExclamation.vue";

@Component({
    name: "form-input-text",
    components: {
        IconExclamation,
        IconCheck
    }
})
export default class FormInputText extends Vue {
    @Prop() inputType: "text" | "password" | "email";
    @Prop() value: string;
    @Prop() validationErrors: string[];
    @Prop() label: string;
}
</script>

<style scoped>
.form-validation-icon {
    @apply h-8 w-8 absolute right-0 pr-2;
}
</style>
