<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Watch} from "vue-property-decorator";
    import FormInputTextComponent from "./form-input-text-component.vue";
    import {IForm} from "../../interfaces/iform";
    import {Validator, ValidationErrors} from "meta-validator";

    @Component({
        name: "form-base",
        components: {
            "form-input-text": FormInputTextComponent
        }
    })
    export default class FormBaseComponent extends Vue implements IForm {
        formModel: Record<string, any>;
        validationErrors: ValidationErrors = {};
        isComplete: boolean = false;
        isSkipMissingProperties = true;

        @Watch("formModel", {immediate: true, deep: true})
        onFormModelChanged(newVal: Record<string, any>): void {
            // console.log("form-base - onFormModelChanged()");
            this.validationErrors = Validator.validate(newVal, {isSkipMissingProperties: this.isSkipMissingProperties});
        }

        isFormValid(): boolean {
            // console.log("form-base - isFormValid()");
            this.isSkipMissingProperties = false;
            this.validationErrors = Validator.validate(this.formModel, {isSkipMissingProperties: this.isSkipMissingProperties});
            return Object.keys(this.validationErrors).length === 0;
        }

        resetForm(): void {
            // Warning! - Here be dragons!
            const formModelConstructor: any = this.formModel.constructor;
            this.formModel = new formModelConstructor();
            this.isSkipMissingProperties = true;
        }

        mounted(): void {
            if (!this.formModel) {
                throw new Error("FormBase() - formModel is undefined");
            }
        }
    }
</script>
