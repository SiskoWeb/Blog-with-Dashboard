// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAY2k2QAS4WL4nzDZBuQSXrjBPNrISSVoE",

  authDomain: "blog-450f0.firebaseapp.com",

  projectId: "blog-450f0",

  storageBucket: "blog-450f0.appspot.com",

  messagingSenderId: "240123056747",

  appId: "1:240123056747:web:ea42be50db89eb5a3e172e"

};



// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
