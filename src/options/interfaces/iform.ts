import {ValidationErrors} from "meta-validator";

export interface IForm {
    formModel: any;
    validationErrors: ValidationErrors;
    isComplete: boolean;
    isSkipMissingProperties: boolean;
    isFormValid(): boolean;
    resetForm(): void;
}
