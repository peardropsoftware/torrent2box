import {IFriendlyValidation} from "./ifriendly-validation";

export interface IForm {
    formModel: any;
    validationErrors: IFriendlyValidation;
    isComplete: boolean;
    isSkipMissingProperties: boolean;
    isFormValid(): Promise<boolean>;
    resetForm(): void;
}
