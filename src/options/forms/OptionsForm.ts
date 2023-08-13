import {Form} from "./abstract/Form.js";
import {OptionsDto} from "../../shared/dtos/OptionsDto.js";
import {ChromeStorage} from "../../shared/services/ChromeStorage.js";
import {Toaster} from "../services/Toaster.js";

export class OptionsForm extends Form<OptionsDto> {
    constructor() {
        super(new OptionsDto());
    }

    async submit(): Promise<void> {
        try {
            if (await this.isFormValid()) {
                await ChromeStorage.save(this.form.value);
                Toaster.success("Options saved");
            } else {
                Toaster.error("Invalid options");
            }
        } catch (error) {
            this.errorMessage.value = error.message;
        }
    }
}
