import {ValidationErrors} from "meta-validator";

export interface Form {
    formModel: any;
    validationErrors: ValidationErrors;
    isComplete: boolean;
    isSkipMissingProperties: boolean;
    isFormValid(): boolean;
    resetForm(): void;
}
