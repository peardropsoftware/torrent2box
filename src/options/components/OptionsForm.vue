<template>
  <div>
    <form v-focus novalidate @submit.prevent="submitForm()">
      <form-input-text v-model="formModel.serverUrl"
                       :validation-errors="validationErrors.serverUrl"
                       input-type="text"
                       label="Server URL">
        <svg class="form-icon">
          <use href="/images/svg/server.svg#server" />
        </svg>
      </form-input-text>

      <form-input-text v-model="formModel.userName"
                       :validation-errors="validationErrors.userName"
                       input-type="text"
                       label="User name">
        <svg class="form-icon">
          <use href="/images/svg/user.svg#user" />
        </svg>
      </form-input-text>

      <form-input-text v-model="formModel.password"
                       :validation-errors="validationErrors.password"
                       input-type="password"
                       label="Password">
        <svg class="form-icon">
          <use href="/images/svg/key.svg#key" />
        </svg>
      </form-input-text>

      <div class="flex">
        <a href="#" class="text-base text-blue-600 hover:underline" @click="restoreDefaultLinkMatcher()">Restore
          default</a>
        <span class="border-r border-black h-4 self-center mx-2"></span>
        <a href="https://regex101.com/r/BW6goQ/1" class="text-base text-blue-600 hover:underline" target="_blank">Regex
          101</a>
      </div>

      <form-input-text v-model="formModel.linkMatcher"
                       :validation-errors="validationErrors.linkMatcher"
                       input-type="text"
                       label="Link matcher (regular expression)">
        <svg class="form-icon">
          <use href="/images/svg/link.svg#link" />
        </svg>
      </form-input-text>

      <div class="flex w-full justify-end">
        <button type="submit" class="rounded bg-blue-400 px-4 py-2 text-base text-white hover:bg-blue-500">
          {{submitButtonText}}
        </button>
      </div>
    </form>

    <form-error-message :error-message="errorMessage"></form-error-message>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import FormErrorMessage from "./form/FormErrorMessage.vue";
import {Form} from "../interfaces/Form";
import FormBase from "./form/FormBase.vue";
import {Mixins} from "vue-property-decorator";
import {OptionsModel} from "../../shared/models/OptionsModel";
import {ChromeStorage} from "../../shared/services/ChromeStorage";
import {ToasterService} from "../services/ToasterService";

@Component({
    name: "options-form",
    components: {
        FormErrorMessage
    }
})
export default class OptionsForm extends Mixins<Form>(FormBase) implements Form {
    formModel: OptionsModel = new OptionsModel();
    errorMessage: string = "";
    toasterService: ToasterService = new ToasterService();
    submitButtonText: string = "Save options";

    async submitForm(): Promise<void> {
        try {
            if (await this.isFormValid()) {
                await ChromeStorage.save(this.formModel);
                this.toasterService.success("Options saved");
            } else {
                this.toasterService.error("Invalid options");
            }
        } catch (error) {
            this.errorMessage = error.message;
        }
    }

    restoreDefaultLinkMatcher(): void {
        this.formModel.linkMatcher = this.formModel.getDefaultLinkMatcher();
    }

    async mounted(): Promise<void> {
        try {
            const optionsModel: OptionsModel = await ChromeStorage.load();
            if (optionsModel) {
                this.formModel = optionsModel;
                this.submitButtonText = "Update options";
            }
        } catch (error) {
            // This is most likely "Storage is empty" and safely ignored.
            console.log(error.message);
        }
    }
}
</script>
