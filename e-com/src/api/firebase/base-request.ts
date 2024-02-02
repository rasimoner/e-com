import { EntityModel } from "@/types/entity-model";

export interface BaseRequest<T extends EntityModel> {
    model?: T;
    path: string;
}
