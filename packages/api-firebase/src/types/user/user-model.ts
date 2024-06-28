import { EntityModel } from "@e-com/common";

export interface UserModel extends EntityModel {
    userName: string;
    email: string;
    password: string;
}
