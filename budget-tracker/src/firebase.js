// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8WoNRxPoW461j9LfgRXuzB30kFMVI90M",
  authDomain: "budget-tracker-7b11c.firebaseapp.com",
  projectId: "budget-tracker-7b11c",
  storageBucket: "budget-tracker-7b11c.firebasestorage.app",
  messagingSenderId: "935670627292",
  appId: "1:935670627292:web:7710cf04e1c35770c3ad19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);