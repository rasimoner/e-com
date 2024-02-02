import { EntityModel, EnumProductCategory } from "@/types";

export interface ProductModel extends EntityModel {
    name: string;
    picture: string;
    price: number;
    colors?: string[];
    categoryId: EnumProductCategory;
}
