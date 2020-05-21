<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Watch} from "vue-property-decorator";
    import FormInputTextComponent from "./form-input-text-component.vue";
    import {IFriendlyValidation} from "../../interfaces/ifriendly-validation";
    import {FriendlyValidation} from "../../utilities/friendly-validation";
    import {IForm} from "../../interfaces/iform";

    @Component({
        name: "form-base",
        components: {
            "form-input-text": FormInputTextComponent
        }
    })
    export default class FormBaseComponent extends Vue implements IForm {
        formModel: Record<string, any>;
        validationErrors: IFriendlyValidation = {};
        isComplete: boolean = false;
        isSkipMissingProperties = true;

        @Watch("formModel", {immediate: true, deep: true})
        async onFormModelChanged(newVal: Record<string, any>): Promise<void> {
            // console.log("form-base - onFormModelChanged()");
            this.validationErrors = await FriendlyValidation.validate(newVal, {skipMissingProperties: this.isSkipMissingProperties});
        }

        async isFormValid(): Promise<boolean> {
            // console.log("form-base - isFormValid()");
            this.isSkipMissingProperties = false;
            this.validationErrors = await FriendlyValidation.validate(this.formModel, {skipMissingProperties: this.isSkipMissingProperties});
            return (Object.keys(this.validationErrors).length === 0);
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
