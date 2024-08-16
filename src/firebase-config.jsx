// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeTaQ-M5sM7PHhOgrBCbn6S6ZG9UF3lCs",
  authDomain: "chat-app-b9501.firebaseapp.com",
  projectId: "chat-app-b9501",
  storageBucket: "chat-app-b9501.appspot.com",
  messagingSenderId: "331287049842",
  appId: "1:331287049842:web:c412d1c748a01790ca74eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);