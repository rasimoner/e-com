import { UserModel } from "@/types/user";
import { baseService } from "@/api/firebase/base-service";

export class UserService {
    readonly path = "user";
    addCollection = async () => {
        const model: UserModel = {
            userName: "",
            email: "",
            password: "",
        };
        return baseService.addApiCollection(model, this.path);
    };
    createUser = async (model: UserModel) =>
        await baseService.updateApiData({ model, path: this.path });

    getUser = async (model: UserModel): Promise<UserModel[]> => {
        // const q = query(collection(db, this.path), where());
        return await baseService.getDataFromApi({ model, path: this.path });
    };
}

export const userService = () => new UserService();
