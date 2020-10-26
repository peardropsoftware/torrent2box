import {ValidationErrors} from "meta-validator";

export interface Form {
    formModel: any;
    validationErrors: ValidationErrors;
    isSkipMissingProperties: boolean;
    isFormValid(): Promise<boolean>;
    resetForm(): void;
}
