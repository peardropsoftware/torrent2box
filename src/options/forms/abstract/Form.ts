import {Ref, ref, watch} from "vue";
import {MetaValidator} from "meta-validator";
import {validationErrorFormatter} from "../../utilities/validation-error-formatter.js";

export abstract class Form<T extends Record<PropertyKey, any>> {
    form: Ref<T>;
    validationErrors: Ref<Record<PropertyKey, any>> = ref({});
    isBusy: Ref<boolean> = ref(false);
    errorMessage: Ref<string> = ref("");
    isSuccess: Ref<boolean> = ref(false);
    isSkipUndefinedValues = true;

    protected constructor(form: T) {
        this.form = ref(form) as Ref<T>;
        watch(this.form, async (value, oldValue) => {
            this.validationErrors.value = await new MetaValidator().validate(value, {
                isSkipUndefinedValues: this.isSkipUndefinedValues,
                customErrorMessageFormatter: validationErrorFormatter
            });
        }, {
            deep: true,
            immediate: true
        });
    }

    async isFormValid(): Promise<boolean> {
        this.isSkipUndefinedValues = false;
        this.validationErrors.value = await new MetaValidator().validate(this.form.value, {
            isSkipUndefinedValues: this.isSkipUndefinedValues,
            customErrorMessageFormatter: validationErrorFormatter
        });
        return (Object.keys(this.validationErrors.value).length === 0);
    }

    resetForm(): void {
        // Warning! - Here be dragons!
        const formConstructor: any = this.form.value.constructor;
        this.form.value = new formConstructor();
        this.isSkipUndefinedValues = true;
    }
}
