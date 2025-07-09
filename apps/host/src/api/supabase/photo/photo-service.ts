import { supabaseService } from "@e-com/api-supabase";
import { PhotoModel } from "@interfaces/photo";

class PhotoService {
    readonly path = "Photos";

    getPhotos = async (model?: Partial<PhotoModel>): Promise<PhotoModel[]> =>
        await supabaseService.getDataFromApi<PhotoModel>({ model, path: this.path });
}

export const photoService = () => new PhotoService();
