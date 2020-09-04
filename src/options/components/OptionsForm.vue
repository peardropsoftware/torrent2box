<template>
  <div id="options-form">
    <form-layout>
      <form v-focus novalidate @submit.prevent="submitForm()">
        <form-input-text v-model="formModel.serverUrl"
                         :validation-errors="validationErrors.serverUrl"
                         icon-class="fa-server"
                         input-type="text"
                         label="Server URL"></form-input-text>

        <form-input-text v-model="formModel.userName"
                         :validation-errors="validationErrors.userName"
                         icon-class="fa-user"
                         input-type="text"
                         label="User name"></form-input-text>

        <form-input-text v-model="formModel.password"
                         :validation-errors="validationErrors.password"
                         icon-class="fa-key"
                         input-type="password"
                         label="Password"></form-input-text>

        <a href="#" @click="restoreDefaultLinkMatcher()">Restore default</a>
        |
        <a href="https://regex101.com/r/BW6goQ/1" target="_blank">Regex 101</a>
        <form-input-text v-model="formModel.linkMatcher"
                         :validation-errors="validationErrors.linkMatcher"
                         icon-class="fa-link"
                         input-type="text"
                         label="Link matcher (regular expression)"></form-input-text>


        <div class="control is-pulled-right" style="margin-top: 1rem;">
          <button class="button is-info" type="submit">{{submitButtonText}}</button>
        </div>

        <div class="is-clearfix"></div>
      </form>

      <form-error-message :error-message="errorMessage"></form-error-message>
    </form-layout>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import FormLayout from "./form/FormLayout.vue";
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
        FormLayout,
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
                this.toasterService.error("Invalid options")
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

<style lang="scss">
#options-form {
  // Empty
}
</style>
