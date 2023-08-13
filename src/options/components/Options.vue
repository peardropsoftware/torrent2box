<script lang="ts">
import {defineComponent, onMounted} from "vue";
import FormErrorMessage from "./form/FormErrorMessage.vue";
import {OptionsForm} from "../forms/OptionsForm.js";
import FormInputText from "./form/FormInputText.vue";
import {OptionsDto} from "../../shared/dtos/OptionsDto.js";
import {ChromeStorage} from "../../shared/services/ChromeStorage.js";

export default defineComponent({
  name: "Options",
  components: {
    FormInputText,
    FormErrorMessage
  },
  setup() {
    const optionsForm = new OptionsForm();

    function restoreDefaultLinkMatcher(): void {
      optionsForm.form.value.linkMatcher = optionsForm.form.value.getDefaultLinkMatcher();
    }

    onMounted(async () => {
      try {
        const optionsDto: OptionsDto = await ChromeStorage.load();
        if (optionsDto) {
          optionsForm.form.value = optionsDto;
        }
      } catch (error) {
        // This is most like "storage is empty" and safely ignored
        console.error(error);
      }
    });

    return {
      optionsForm,
      restoreDefaultLinkMatcher
    };
  }
});
</script>

<template>
  <div>
    <form v-focus novalidate @submit.prevent="optionsForm.submit()">
      <form-input-text v-model="optionsForm.form.value.serverUrl"
                       :validation-errors="optionsForm.validationErrors.value.serverUrl"
                       input-type="text"
                       label="Server URL">
        <svg class="tb-form-input-icon">
          <use href="/images/icons/server.svg#server" />
        </svg>
      </form-input-text>

      <form-input-text v-model="optionsForm.form.value.userName"
                       :validation-errors="optionsForm.validationErrors.value.userName"
                       input-type="text"
                       label="User name">
        <svg class="tb-form-input-icon">
          <use href="/images/icons/user.svg#user" />
        </svg>
      </form-input-text>

      <form-input-text v-model="optionsForm.form.value.password"
                       :validation-errors="optionsForm.validationErrors.value.password"
                       input-type="password"
                       label="Password">
        <svg class="tb-form-input-icon">
          <use href="/images/icons/key.svg#key" />
        </svg>
      </form-input-text>

      <div class="flex">
        <a class="text-base text-blue-600 hover:underline" href="#" @click="restoreDefaultLinkMatcher()">Restore
          default</a>
        <span class="border-r border-black h-4 self-center mx-2"></span>
        <a class="text-base text-blue-600 hover:underline" href="https://regex101.com/r/BW6goQ/1" target="_blank">Regex
          101</a>
      </div>

      <form-input-text v-model="optionsForm.form.value.linkMatcher"
                       :validation-errors="optionsForm.validationErrors.value.linkMatcher"
                       input-type="text"
                       label="Link matcher (regular expression)">
        <svg class="tb-form-input-icon">
          <use href="/images/icons/link.svg#link" />
        </svg>
      </form-input-text>

      <div class="flex w-full justify-end">
        <button class="rounded bg-blue-400 px-4 py-2 text-lg text-white hover:bg-blue-500" type="submit">Save options
        </button>
      </div>
    </form>

    <form-error-message :error-message="optionsForm.errorMessage.value"></form-error-message>
  </div>
</template>
