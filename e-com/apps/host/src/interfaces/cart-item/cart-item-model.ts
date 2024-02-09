import { ProductModel } from "@interfaces/product";

export interface CartItemModel extends Omit<ProductModel, "colors"> {
    color?: string;
    count: number;
    total: number;
}
