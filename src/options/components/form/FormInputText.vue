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
    setup(props, context) {
        const inputCssObject = computed(() => {
            return {
                "border-2 border-red-500": props.validationErrors,
                "border-2 border-green-500": !props.validationErrors && props.modelValue,
                "px-10": context.slots["default"],
                "px-2": !context.slots["default"]
            };
        });

        return {
            inputCssObject
        };
    }
});
</script>

<template>
  <div class="mb-4">
    <label class="font-semibold">{{label}}</label>
    <div class="flex items-center relative">
      <input class="w-full py-2 border-2 text-base rounded"
             :type="inputType"
             :value="modelValue"
             :class="inputCssObject"
             @input="$emit('update:modelValue', $event.target.value)" />
      <slot></slot>
      <svg v-if="!validationErrors && modelValue" class="tb-form-validation-icon text-green-500">
        <use href="/images/icons/check-circle-solid.svg#check-circle-solid" />
      </svg>
      <svg v-if="validationErrors" class="tb-form-validation-icon text-red-500">
        <use href="/images/icons/exclamation-circle-solid.svg#exclamation-circle-solid" />
      </svg>
    </div>
    <ul class="text-sm text-red-700">
      <li v-for="validationError in validationErrors">{{validationError}}</li>
    </ul>
  </div>
</template>
