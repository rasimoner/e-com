import { EntityModel } from "../entity-model";

export interface ProductModel extends EntityModel {
    name: string;
    picture: string;
    price: number;
    colors?: string[];
}
