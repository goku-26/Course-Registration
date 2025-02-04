// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCZBxA4vO2DMiqeFjGWsQo-sQG4sFfj9eo",
// //   authDomain: "auth-3b63c.firebaseapp.com",
// //   projectId: "auth-3b63c",
// //   storageBucket: "auth-3b63c.firebasestorage.app",
// //   messagingSenderId: "126624703434",
// //   appId: "1:126624703434:web:bfaff0f57b5359b56e6533",
// //   measurementId: "G-7T58C8VT2M"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // export const db = getFirestore(app);

// // Import the necessary Firebase modules
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";  // ✅ Import Firebase Authentication
// import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore
// import { getAnalytics } from "firebase/analytics";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCZBxA4vO2DMiqeFjGWsQo-sQG4sFfj9eo",
//   authDomain: "auth-3b63c.firebaseapp.com",
//   projectId: "auth-3b63c",
//   storageBucket: "auth-3b63c.appspot.com", // ✅ Fixed storageBucket URL
//   messagingSenderId: "126624703434",
//   appId: "1:126624703434:web:bfaff0f57b5359b56e6533",
//   measurementId: "G-7T58C8VT2M"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);  // ✅ Initialize Authentication
// const db = getFirestore(app); // ✅ Initialize Firestore

// export { auth, db }; // ✅ Export both Authentication and Firestore
