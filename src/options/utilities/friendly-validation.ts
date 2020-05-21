import {validate, ValidationError, ValidatorOptions} from "class-validator-fork";
import {sentenceCase} from "change-case";
import {IFriendlyValidation} from "../interfaces/ifriendly-validation";

export class FriendlyValidation {
    static async validate(objectToValidate: Record<string, any>, validatorOptions?: ValidatorOptions): Promise<IFriendlyValidation> {
        const friendlyValidationErrors: IFriendlyValidation = {};
        const validationErrors: ValidationError[] = await validate(objectToValidate, validatorOptions);

        function addFriendly(validationError: ValidationError): void {
            if (validationError.constraints) {
                Object.keys(validationError.constraints).forEach(value => {
                    if (friendlyValidationErrors[validationError.property] == null) {
                        friendlyValidationErrors[validationError.property] = [];
                    }
                    friendlyValidationErrors[validationError.property].push(validationError.constraints![value]
                        .replace(validationError.property, sentenceCase(validationError.property)));
                });
            }
        }

        // Field constraints
        for (const validationError of validationErrors) {
            addFriendly(validationError);
            // Nested child constraints
            for (const childValidationError of validationError.children) {
                addFriendly(childValidationError);
            }
        }

        return friendlyValidationErrors;
    }
}
