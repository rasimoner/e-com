import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "./config";
import { BaseRequest } from "./base-request";

class BaseService {
    addApiCollection = async <T extends { id?: string }>(
        model: T,
        path: string,
    ): Promise<boolean> => {
        if (!model.id) model.id = uuidv4();
        const docRef = await addDoc(collection(db, path), model);
        if (!docRef.id) throw "Bir hata oluştu.";

        return true;
    };
    updateApiData = async <T extends { id?: string }>(req: BaseRequest<T>): Promise<void> => {
        if (!req.model?.id) {
            const id: string = uuidv4();
            return await setDoc(doc(db, req.path, id), { ...req.model, id });
        }

        return await updateDoc(doc(db, req.path, req.model.id), req.model);
    };
    getDataFromApi = async <T extends { id?: string }>(req: BaseRequest<T>): Promise<T[]> => {
        if (req.model?.id) {
            const res = await getDoc(doc(db, req.path, req.model.id ?? ""));
            return <T[]>[res.data()];
        }

        const filters = this.createQueryFilters(req);
        const querySnapshot = await getDocs(
            query(
                collection(db, req.path),
                ...Object.entries(filters).map(([key, value]) => where(key, "==", value)),
            ),
        );

        return querySnapshot.docs.map((doc) => doc.data() as T);
    };

    createQueryFilters = <T extends { id?: string }>(req: BaseRequest<T>) => {
        const filters: Record<string, unknown> = {};
        for (const prop in req.model) {
            if (Object.prototype.hasOwnProperty.call(req.model, prop)) {
                if (req.model[prop] !== undefined && req.model[prop] !== null)
                    filters[prop] = req.model[prop];
            }
        }
        return filters;
    };
}

export const baseService = new BaseService();
