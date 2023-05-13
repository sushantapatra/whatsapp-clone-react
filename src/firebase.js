import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLjK9xrHzY2WfllaUTjrBI5xJnCc2y6YE",
    authDomain: "whatsappclone-c86bb.firebaseapp.com",
    projectId: "whatsappclone-c86bb",
    storageBucket: "whatsappclone-c86bb.appspot.com",
    messagingSenderId: "65080233112",
    appId: "1:65080233112:web:5feadbbdeff29f6a4054ed"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();

export { db, auth, provider }