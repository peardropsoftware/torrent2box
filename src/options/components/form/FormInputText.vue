<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {ValidationErrors} from "meta-validator";

export default defineComponent({
  name: "FormInputText",
  props: {
    inputType: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    validationErrors: {
      type: Array as PropType<ValidationErrors[]>,
    },
    label: {
      type: String,
    }
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const inputCssObject = computed(() => {
      return {
        "border-2 border-red-500": props.validationErrors,
        "border-2 border-green-500": !props.validationErrors && props.modelValue,
        "px-10": context.slots["default"],
        "px-2": !context.slots["default"]
      };
    });

    function updateModel(event: Event) {
      const inputEl = event.target as HTMLInputElement;
      context.emit("update:modelValue", inputEl.value);
    }

    return {
      inputCssObject,
      updateModel
    };
  }
});
</script>

<template>
  <div class="mb-4">
    <div class="flex items-center relative">
      <input :class="inputCssObject"
             :placeholder="label"
             :type="inputType"
             :value="modelValue"
             class="w-full py-2 border border-gray-300 text-base rounded placeholder-opacity-100 placeholder-gray-500"
             @input="updateModel" />
      <slot></slot>
      <svg v-if="!validationErrors && modelValue" class="tb-form-validation-icon text-green-500">
        <use href="/images/icons/check.svg#check" />
      </svg>
      <svg v-if="validationErrors" class="tb-form-validation-icon text-red-500">
        <use href="/images/icons/exclamation.svg#exclamation" />
      </svg>
    </div>
    <ul class="text-sm text-red-700">
      <li v-for="validationError in validationErrors">{{validationError}}</li>
    </ul>
  </div>
</template>
