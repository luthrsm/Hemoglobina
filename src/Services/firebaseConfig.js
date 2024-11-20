//adc aq a config do firebase

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCM51pdn8_kU_5d50M05qdGIYhvuZMzBtk",
    authDomain: "hemoglobina-d2f7f.firebaseapp.com",
    projectId: "hemoglobina-d2f7f",
    storageBucket: "hemoglobina-d2f7f.firebasestorage.app",
    messagingSenderId: "766017812488",
    appId: "1:766017812488:web:1157f9672a1153bcfe79bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };