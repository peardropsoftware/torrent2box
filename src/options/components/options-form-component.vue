<template>
  <div id="options-form">
    <form-layout>
      <form v-focus novalidate @submit.prevent="submitForm()">
        <form-input-text v-model="formModel.serverUrl"
                         input-type="text"
                         :validation-errors="validationErrors.serverUrl"
                         label="Server URL"
                         icon-class="fa-server">
        </form-input-text>

        <form-input-text v-model="formModel.userName"
                         input-type="text"
                         :validation-errors="validationErrors.userName"
                         label="User name"
                         icon-class="fa-user">
        </form-input-text>

        <form-input-text v-model="formModel.password"
                         input-type="password"
                         :validation-errors="validationErrors.password"
                         label="Password"
                         icon-class="fa-key">
        </form-input-text>

        <div class="control is-pulled-right">
          <button class="button is-primary" type="submit">Save</button>
        </div>

        <div class="is-clearfix"></div>
      </form>

      <form-error-message :error-message="errorMessage"></form-error-message>
    </form-layout>
  </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import FormLayoutComponent from "./form/form-layout-component.vue";
    import FormErrorMessageComponent from "./form/form-error-message-component.vue";
    import {IForm} from "../interfaces/iform";
    import FormBaseComponent from "./form/form-base-component.vue";
    import {Mixins} from "vue-property-decorator";
    import {OptionsModel} from "../../shared/options-model";
    import {ChromeStorage} from "../../shared/chrome-storage";
    import {ToasterService} from "../services/toaster-service";

    @Component({
        name: "options-form",
        components: {
            "form-layout": FormLayoutComponent,
            "form-error-message": FormErrorMessageComponent
        }
    })
    export default class OptionsFormComponent extends Mixins<IForm>(FormBaseComponent) implements IForm {
        formModel: OptionsModel = new OptionsModel();
        errorMessage: string = "";
        toasterService: ToasterService = new ToasterService();

        async submitForm(): Promise<void> {
            try {
                if (await this.isFormValid()) {
                    ChromeStorage.save("torrent2box", this.formModel);
                    this.toasterService.success("Saved!");
                }
            } catch (error) {
                this.errorMessage = error.message;
            }
        }
    }
</script>

<style lang="scss">
  #options-form {
    // Empty
  }
</style>
