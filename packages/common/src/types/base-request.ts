import { EntityModel } from "./index";

export interface BaseRequest<T extends EntityModel> {
    model?: T;
    path: string;
}
