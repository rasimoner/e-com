import { EntityModel } from "@e-com/common";

export interface CategoryModel extends EntityModel {
    categoryName: string;
    categoryValue: number;
}
