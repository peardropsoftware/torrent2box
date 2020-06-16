<template>
  <div id="options-form">
    <form-layout>
      <form v-focus novalidate @submit.prevent="submitForm()">
        <form-input-text v-model="formModel.serverUrl"
                         input-type="text"
                         :validation-errors="validationErrors.serverUrl"
                         label="Server URL"
                         icon-class="fa-server"></form-input-text>

        <form-input-text v-model="formModel.userName"
                         input-type="text"
                         :validation-errors="validationErrors.userName"
                         label="User name"
                         icon-class="fa-user"></form-input-text>

        <form-input-text v-model="formModel.password"
                         input-type="password"
                         :validation-errors="validationErrors.password"
                         label="Password"
                         icon-class="fa-key"></form-input-text>

        <a href="#" @click="restoreDefaultLinkMatcher()">Restore default</a>
        |
        <a href="https://regex101.com/r/BW6goQ/1" target="_blank">Regex 101</a>
        <form-input-text v-model="formModel.linkMatcher"
                         input-type="text"
                         :validation-errors="validationErrors.linkMatcher"
                         label="Link matcher (regular expression)"
                         icon-class="fa-link"></form-input-text>


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
    import {IForm} from "../interfaces/IForm";
    import FormBase from "./form/FormBase.vue";
    import {Mixins} from "vue-property-decorator";
    import {OptionsModel} from "../../shared/models/OptionsModel";
    import {ChromeStorage} from "../../shared/utilities/ChromeStorage";
    import {ToasterService} from "../services/ToasterService";

    @Component({
        name: "options-form",
        components: {
            FormLayout,
            FormErrorMessage
        }
    })
    export default class OptionsForm extends Mixins<IForm>(FormBase) implements IForm {
        formModel: OptionsModel = new OptionsModel();
        errorMessage: string = "";
        toasterService: ToasterService = new ToasterService();
        submitButtonText: string = "Save options";

        async submitForm(): Promise<void> {
            try {
                if (this.isFormValid()) {
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
                // Do nothing
            }
        }
    }
</script>

<style lang="scss">
  #options-form {
    // Empty
  }
</style>
