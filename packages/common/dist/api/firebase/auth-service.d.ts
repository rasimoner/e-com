import { User } from "firebase/auth";
import { UserModel } from "../../types";
declare class AuthService {
    currentAuth: () => import("@firebase/auth").Auth;
    createUser(model: UserModel): Promise<string | User>;
    updateProfileDetail(req: {
        user: User;
        displayName?: string;
        photoUrl?: string;
    }): Promise<string | undefined>;
    signIn(model: UserModel): Promise<import("@firebase/auth").UserCredential | "Invalid Email" | "No account with this email" | "Incorrect password" | "Email or password was incorrect">;
}
export declare const authService: AuthService;
export {};
