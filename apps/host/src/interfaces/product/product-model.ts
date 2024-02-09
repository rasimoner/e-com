import { EnumProductCategory } from "../product";
import { EntityModel } from "@e-com/common";

export interface ProductModel extends EntityModel {
    name: string;
    picture: string;
    price: number;
    colors?: string[];
    categoryId: EnumProductCategory;
}
