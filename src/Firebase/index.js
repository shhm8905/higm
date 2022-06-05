import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDz5ds4q43BIc3La8XA5E-SEgBYsOyjmEE",
    authDomain: "todo-app-b0836.firebaseapp.com",
    projectId: "todo-app-b0836",
    storageBucket: "todo-app-b0836.appspot.com",
    messagingSenderId: "635480460737",
    appId: "1:635480460737:web:122025713970eebb127340"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);