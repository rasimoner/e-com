import { firebaseService } from "@e-com/api-firebase";
import { CategoryModel } from "@interfaces/category";

class CategoryService {
    readonly path = "categories";
    addCollection = async () => {
        const model: CategoryModel = {
            categoryName: "",
            categoryValue: 0,
        };
        return firebaseService.addApiCollection(model, this.path);
    };
    saveCategory = async (model: CategoryModel) =>
        await firebaseService.updateApiData({ model, path: this.path });

    getCategories = async (model?: CategoryModel): Promise<CategoryModel[]> => {
        // const q = query(collection(db, this.path), where());
        return await firebaseService.getDataFromApi({ model, path: this.path });
    };
}

export const categoryService = () => new CategoryService();
