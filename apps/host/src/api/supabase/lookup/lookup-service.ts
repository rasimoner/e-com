import { supabaseService } from "@e-com/api-supabase";
import { LookupModel } from "@interfaces/lookup";

class LookupService {
    readonly path = "Lookups";

    getLookups = async (model?: Partial<LookupModel>): Promise<LookupModel[]> =>
        await supabaseService.getDataFromApi<LookupModel>({ model, path: this.path });
}

export const lookupService = () => new LookupService();
