import { EnumInventoryStatus, EnumProductCategory } from "../product";
import { EntityModel } from "@e-com/common";

export interface ProductModel extends EntityModel {
    name: string;
    picture: string;
    price: number;
    originalPrice: number;
    colors?: string[];
    categoryId: EnumProductCategory;
    inventoryStatus?: EnumInventoryStatus;
    rating?: number;
    description?: string;
}
