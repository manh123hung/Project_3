// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth,GoogleAuthProvider,sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Auth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvBVDZybOV_XCNwyKr_7crFugwWvL4CR8",
  authDomain: "project-3-58a9a.firebaseapp.com",
  projectId: "project-3-58a9a",
  storageBucket: "project-3-58a9a.appspot.com",
  messagingSenderId: "14339492577",
  appId: "1:14339492577:web:4e2270db03cd0a78c105a0",
  measurementId: "G-5XED5CV1EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
const storage = getStorage(app);
export {storage};
