import { ProductModel } from "../product/product-model";

export interface CartItemModel extends Omit<ProductModel, "colors"> {
    color?: string;
    count: number;
    total: number;
}
