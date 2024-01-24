import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvwc5n8vaH9Z9rIawPdHBR_4aCUXOyWLM",
    authDomain: "e-com-a3034.firebaseapp.com",
    projectId: "e-com-a3034",
    storageBucket: "e-com-a3034.appspot.com",
    messagingSenderId: "259974195186",
    appId: "1:259974195186:web:f4902169166b4b45fe2d6b",
    measurementId: "G-R7VN3PX5TS",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
