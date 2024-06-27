import { supabaseService } from "@e-com/common";
import { ColorModel } from "@interfaces/color";

class ColorService {
    readonly path = "Colors";

    getColors = async (model?: ColorModel): Promise<ColorModel[]> =>
        await supabaseService.getDataFromApi<ColorModel>({ model, path: this.path });
}

export const colorService = () => new ColorService();
