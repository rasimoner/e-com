import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
    User,
} from "firebase/auth";
import { UserModel } from "@/types/user";
import { FirebaseStorageError } from "./firebase-storage-error";
import { firebaseApp } from "./index";

class AuthService {
    currentAuth = () => getAuth(firebaseApp);

    async createUser(model: UserModel) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                this.currentAuth(),
                model.email,
                model.password,
            );
            const user = userCredential.user;

            if (user) await this.updateProfileDetail({ user, displayName: model.userName });

            return userCredential;
        } catch (e) {
            alert((e as Error).message);
        }
    }

    async updateProfileDetail(req: { user: User; displayName?: string; photoUrl?: string }) {
        try {
            await updateProfile(req.user, {
                displayName: req.displayName,
                photoURL: req.photoUrl,
            });
        } catch (e) {
            alert((e as Error).message);
        }
    }

    async signIn(model: UserModel) {
        try {
            return await signInWithEmailAndPassword(
                this.currentAuth(),
                model.email,
                model.password,
            );
        } catch (e) {
            const error = e as FirebaseStorageError;
            switch (error.code) {
                case "auth/invalid-email":
                    return alert("Invalid Email");
                case "auth/user-not-found":
                    return alert("No account with this email");
                case "auth/wrong-password":
                    return alert("Incorrect password");
                default:
                    return alert("Email or password was incorrect");
            }
        }
    }
}

export const authService = new AuthService();
