import { ProductModel } from "../../types/product";

export interface CartItemModel extends Omit<ProductModel, "colors"> {
    color?: string;
    count: number;
    total: number;
}
