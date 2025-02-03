// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC-NY5stX5QtI3eTu_whtd6qkg5CDdV15k",
//   authDomain: "course-17825.firebaseapp.com",
//   projectId: "course-17825",
//   storageBucket: "course-17825.firebasestorage.app",
//   messagingSenderId: "1035289144866",
//   appId: "1:1035289144866:web:823608a25b6d9c6593e47b"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth=getAuth();
// export const db=getFirestore(app);

// export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC-NY5stX5QtI3eTu_whtd6qkg5CDdV15k",
//   authDomain: "course-17825.firebaseapp.com",
//   projectId: "course-17825",
//   storageBucket: "course-17825.appspot.com", // Fixed the incorrect storageBucket URL
//   messagingSenderId: "1035289144866",
//   appId: "1:1035289144866:web:823608a25b6d9c6593e47b",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and Firestore
// export const auth = getAuth(app); // Pass the app instance to getAuth
// export const db = getFirestore(app); // Pass the app instance to getFirestore

// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcYve58YfZQGLjIVdbj_O8xHeoIsWfyvk",
  authDomain: "course-portal-5d528.firebaseapp.com",
  projectId: "course-portal-5d528",
  storageBucket: "course-portal-5d528.firebasestorage.app",
  messagingSenderId: "972077388898",
  appId: "1:972077388898:web:0c48627d8072ebd83ead3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optionally, export the app instance for debugging or other purposes
export default app;
