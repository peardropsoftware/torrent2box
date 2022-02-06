import {FormatterData} from "meta-validator";
import {sentenceCase} from "sentence-case";

export function validationErrorFormatter(data: FormatterData): string {
    let errorMessage = data.message;
    errorMessage = errorMessage.replace("$propertyKey", sentenceCase(data.propertyKey));
    errorMessage = errorMessage.replace("$propertyValue", data.propertyValue);

    if (data.options) {
        for (let i = 0; i < data.options.length; i++) {
            if (data.decoratorName === "IsEqualTo" && i === 0) {
                errorMessage = errorMessage.replace(`$option${i}`, sentenceCase(data.options[i]));
            } else {
                errorMessage = errorMessage.replace(`$option${i}`, data.options[i]);
            }
        }
    }

    return errorMessage;
}
