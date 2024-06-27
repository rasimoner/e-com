import { supabase } from "./supabase";
import { BaseRequest } from "../../types";

class SupabaseService {
    getDataFromApi = async <T extends { id?: string }>(req: BaseRequest<T>): Promise<T[]> => {
        const { data, error, status } = await supabase.from(req.path).select<"*", T>();
        if (error) throw error;

        return data ?? [];
    };
}

export const supabaseService = new SupabaseService();
