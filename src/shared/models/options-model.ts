import {IsNotEmpty, IsUrl} from "class-validator-fork";

export class OptionsModel {
    @IsNotEmpty()
    @IsUrl()
    serverUrl: string;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}
