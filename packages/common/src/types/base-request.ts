import { DeepPartial, EntityModel } from "./index";

export interface BaseRequest<T extends EntityModel> {
    model?: DeepPartial<T>;
    path: string;
}
