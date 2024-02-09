import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
    User,
} from "firebase/auth";
import { UserModel } from "../../types";
import { firebaseApp } from "./config";
import { FirebaseStorageError } from "./firebase-storage-error";

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

            return user;
        } catch (e) {
            return (e as Error).message;
        }
    }

    async updateProfileDetail(req: { user: User; displayName?: string; photoUrl?: string }) {
        try {
            await updateProfile(req.user, {
                displayName: req.displayName,
                photoURL: req.photoUrl,
            });
        } catch (e) {
            return (e as Error).message;
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
                    return "Invalid Email";
                case "auth/user-not-found":
                    return "No account with this email";
                case "auth/wrong-password":
                    return "Incorrect password";
                default:
                    return "Email or password was incorrect";
            }
        }
    }
}

export const authService = new AuthService();
