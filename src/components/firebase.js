// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEcLeIfqQGrJgPEsmynouZ7Lfq9YNehMo",
  authDomain: "login-page-48df2.firebaseapp.com",
  projectId: "login-page-48df2",
  storageBucket: "login-page-48df2.appspot.com",
  messagingSenderId: "946047148825",
  appId: "1:946047148825:web:ce7d16a48a8333a1fb9b88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;