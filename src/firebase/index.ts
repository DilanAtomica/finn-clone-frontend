import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCE6g3Zr87QK8n2scoaokMQnlcrlJpoeSk",
    authDomain: "finn-clone.firebaseapp.com",
    projectId: "finn-clone",
    storageBucket: "finn-clone.appspot.com",
    messagingSenderId: "186663595362",
    appId: "1:186663595362:web:8fcaa226f840840eadd03b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;