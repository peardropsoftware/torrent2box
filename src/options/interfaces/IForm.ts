import {IValidationErrors} from "meta-validator";

export interface IForm {
    formModel: any;
    validationErrors: IValidationErrors;
    isComplete: boolean;
    isSkipMissingProperties: boolean;
    isFormValid(): boolean;
    resetForm(): void;
}
