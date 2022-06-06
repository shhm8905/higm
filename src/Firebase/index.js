import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const fireKey = process.env.REACT_APP_FIRE_KEY,
    authDomain = process.env.REACT_APP_AUTH_DOMAIN,
    projectId = process.env.REACT_APP_PROJECT_ID,
    storageBucket = process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId = process.env.REACT_APP_SENDER_ID,
    appId = process.env.REACT_APP_AP_ID;

const firebaseConfig = {
    apiKey: fireKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);