import { supabase } from "./supabase";
import { BaseRequest, DeepPartial } from "@e-com/common";

class SupabaseService {
    getDataFromApi = async <T extends { id?: string }>(req: BaseRequest<T>): Promise<T[]> => {
        const { data, error } = await this.queryFilter(req);
        if (error) throw error;

        return data ?? [];
    };

    private queryFilter<T extends { id?: string }>(req: BaseRequest<T>) {
        let query = supabase.from(req.path).select<"*", T>();
        if (!req.model) return query;

        Object.keys(req.model)?.forEach((key) => {
            const value = req.model?.[key as keyof DeepPartial<T>];
            if (value !== undefined && value !== null) {
                query = query.eq(key, value);
            }
        });
        return query;
    }
}

export const supabaseService = new SupabaseService();
