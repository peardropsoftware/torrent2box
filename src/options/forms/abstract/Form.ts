import {Ref, ref, watch} from "vue";
import {MetaValidator, ValidationErrors} from "meta-validator";
import {validationErrorFormatter} from "../../utilities/validation-error-formatter";

export abstract class Form<T extends Record<string, any>> {
    form: Ref<T>;
    validationErrors: Ref<ValidationErrors | ValidationErrors[]> = ref({});
    isBusy: Ref<boolean> = ref(false);
    errorMessage: Ref<string> = ref("");
    isSuccess: Ref<boolean> = ref(false);
    isSkipMissingProperties = true;

    protected constructor(form: T) {
        this.form = ref(form) as Ref<T>;
        watch(this.form, async (value, oldValue) => {
            this.validationErrors.value = await new MetaValidator().validate(value, {
                isSkipMissingProperties: this.isSkipMissingProperties,
                customErrorMessageFormatter: validationErrorFormatter
            });
        }, {
            deep: true,
            immediate: true
        });
    }

    async isFormValid(): Promise<boolean> {
        this.isSkipMissingProperties = false;
        this.validationErrors.value = await new MetaValidator().validate(this.form.value, {
            isSkipMissingProperties: this.isSkipMissingProperties,
            customErrorMessageFormatter: validationErrorFormatter
        });
        return (Object.keys(this.validationErrors.value).length === 0);
    }

    resetForm(): void {
        // Warning! - Here be dragons!
        const formConstructor: any = this.form.value.constructor;
        this.form.value = new formConstructor();
        this.isSkipMissingProperties = true;
    }
}
