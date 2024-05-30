// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAovNdUaTnMHhigd89VXkwWmuk8xccFEqE",
  authDomain: "podcast-app-a8556.firebaseapp.com",
  projectId: "podcast-app-a8556",
  storageBucket: "podcast-app-a8556.appspot.com",
  messagingSenderId: "113446381229",
  appId: "1:113446381229:web:86b5428e1759230e6f0824",
  measurementId: "G-P7HGE3ZVFP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
