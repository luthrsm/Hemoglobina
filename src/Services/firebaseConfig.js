//adc aq a config do firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};