import { BaseRequest } from "./base-request";
declare class BaseService {
    addApiCollection: <T extends {
        id?: string | undefined;
    }>(model: T, path: string) => Promise<boolean>;
    updateApiData: <T extends {
        id?: string | undefined;
    }>(req: BaseRequest<T>) => Promise<void>;
    getDataFromApi: <T extends {
        id?: string | undefined;
    }>(req: BaseRequest<T>) => Promise<T[]>;
    createQueryFilters: <T extends {
        id?: string | undefined;
    }>(req: BaseRequest<T>) => Record<string, unknown>;
}
export declare const baseService: BaseService;
export {};
