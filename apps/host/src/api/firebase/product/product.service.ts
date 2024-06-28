import { firebaseService } from "@e-com/api-firebase";
import { EnumProductCategory, ProductModel } from "@interfaces/product";
import { PhotoModel } from "@interfaces/photo";
import { ReviewModel } from "@interfaces/review";

class ProductService {
    readonly path = "newProduct";
    addCollection = async () => {
        const model: ProductModel = {
            categoryId: EnumProductCategory.Other,
            name: "",
            picture: "",
            price: 0,
            originalPrice: 0,
        };
        return firebaseService.addApiCollection(model, this.path);
    };
    saveProduct = async (model: ProductModel) =>
        await firebaseService.updateApiData({ model, path: this.path });

    getProducts = async (model?: ProductModel): Promise<ProductModel[]> => {
        // const q = query(collection(db, this.path), where());
        return await firebaseService.getDataFromApi({ model, path: this.path });
    };

    getProductPhotos = async (documentKey: string, model?: PhotoModel): Promise<PhotoModel[]> => {
        return await firebaseService.getDataFromApi({
            model,
            path: `${this.path}/${documentKey}/photos`,
        });
    };

    getProductReviews = async (
        documentKey: string,
        model?: ReviewModel
    ): Promise<ReviewModel[]> => {
        return await firebaseService.getDataFromApi({
            model,
            path: `${this.path}/${documentKey}/reviews`,
        });
    };
}

export const productService = () => new ProductService();
