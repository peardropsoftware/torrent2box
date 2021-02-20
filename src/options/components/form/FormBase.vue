<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Watch} from "vue-property-decorator";
import FormInputText from "./FormInputText.vue";
import {Form} from "../../interfaces/Form";
import {MetaValidator, ValidationErrors} from "meta-validator";

@Component({
    name: "base-form",
    components: {
        FormInputText
    }
})
export default class BaseForm extends Vue implements Form {
    formModel: Record<string, unknown> = {};
    validationErrors: ValidationErrors = {};
    isSkipMissingProperties = true;

    mounted(): void {
        if (!this.formModel) {
            throw new Error("BaseForm() - formModel is undefined");
        }
    }

    @Watch("formModel", {immediate: true, deep: true})
    async onFormModelChanged(newVal: Record<string, any>): Promise<void> {
        // console.log("form-base - onFormModelChanged()");
        this.validationErrors = await MetaValidator.validate(newVal, {isSkipMissingProperties: this.isSkipMissingProperties});
    }

    async isFormValid(): Promise<boolean> {
        // console.log("form-base - isFormValid()");
        this.isSkipMissingProperties = false;
        this.validationErrors = await MetaValidator.validate(this.formModel, {isSkipMissingProperties: this.isSkipMissingProperties});
        return (Object.keys(this.validationErrors).length === 0);
    }

    resetForm(): void {
        // Warning! - Here be dragons!
        const formModelConstructor: any = this.formModel.constructor;
        this.formModel = new formModelConstructor();
        this.isSkipMissingProperties = true;
    }
}
</script>
