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
      <svg v-if="!validationErrors && value" class="form-validation-icon text-green-500">
        <use href="/images/svg/check.svg#check" />
      </svg>
      <svg v-if="validationErrors" class="form-validation-icon text-red-500">
        <use href="/images/svg/exclamation.svg#exclamation" />
      </svg>
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

@Component({
    name: "form-input-text"
})
export default class FormInputText extends Vue {
    @Prop() inputType: "text" | "password" | "email";
    @Prop() value: string;
    @Prop() validationErrors: string[];
    @Prop() label: string;
}
</script>
