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
    import FormLayout from "./form/form-layout.vue";
    import FormErrorMessage from "./form/form-error-message.vue";
    import {Form} from "../interfaces/form";
    import FormBase from "./form/form-base.vue";
    import {Mixins} from "vue-property-decorator";
    import {OptionsModel} from "../../shared/models/options-model";
    import {ChromeStorage} from "../../shared/utilities/chrome-storage";
    import {ToasterService} from "../services/toaster-service";

    @Component({
        name: "options-form",
        components: {
            "form-layout": FormLayout,
            "form-error-message": FormErrorMessage
        }
    })
    export default class OptionsForm extends Mixins<Form>(FormBase) implements Form {
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
