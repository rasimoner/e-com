import { ProductModel } from "@/types";

export interface CartItemModel extends Omit<ProductModel, "colors"> {
    color?: string;
    count: number;
    total: number;
}
