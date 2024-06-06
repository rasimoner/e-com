import { baseService } from "@e-com/common";
import { EnumPhotoReferenceKey, PhotoModel } from "@interfaces/photo";

class PhotoService {
    readonly path = "photo";
    addCollection = async () => {
        const model: PhotoModel = {
            referenceId: "",
            referenceKey: EnumPhotoReferenceKey.Product,
            imageSrc: "",
            thumbnailSrc: "",
            alt: "",
            title: "",
        };
        return baseService.addApiCollection(model, this.path);
    };
    savePhoto = async (model: PhotoModel) =>
        await baseService.updateApiData({ model, path: this.path });

    getPhotos = async (model?: PhotoModel): Promise<PhotoModel[]> => {
        // const q = query(collection(db, this.path), where());
        return await baseService.getDataFromApi({ model, path: this.path });
    };
}

export const photoService = () => new PhotoService();
