import { supabaseService } from "@e-com/api-supabase";
import { ProductModel } from "@interfaces/product";

class ProductService {
    readonly path = "Products";

    getProducts = async (model?: Partial<ProductModel>): Promise<ProductModel[]> =>
        await supabaseService.getDataFromApi<ProductModel>({ model, path: this.path });
}

export const productService = () => new ProductService();
