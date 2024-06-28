import { firebaseService } from "@e-com/api-firebase";
import { EnumRelationReferenceKey, PhotoModel } from "@interfaces/photo";

class PhotoService {
    readonly path = "photo";
    addCollection = async () => {
        const model: PhotoModel = {
            referenceId: "",
            referenceType: EnumRelationReferenceKey.Product,
            imageSrc: "",
            thumbnailSrc: "",
            alt: "",
            title: "",
        };
        return firebaseService.addApiCollection(model, this.path);
    };
    savePhoto = async (model: PhotoModel) =>
        await firebaseService.updateApiData({ model, path: this.path });

    getPhotos = async (model?: PhotoModel): Promise<PhotoModel[]> => {
        // const q = query(collection(db, this.path), where());
        return await firebaseService.getDataFromApi({ model, path: this.path });
    };
}

export const photoService = () => new PhotoService();
