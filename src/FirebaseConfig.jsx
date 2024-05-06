// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAUL-tedhTXoqDttC4rgtGe2bLXIc4tto",
  authDomain: "support-system-760e9.firebaseapp.com",
  projectId: "support-system-760e9",
  storageBucket: "support-system-760e9.appspot.com",
  messagingSenderId: "76432622045",
  appId: "1:76432622045:web:64d55757ff908b767c7634",
  measurementId: "G-HB1NX82YPL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
export { auth, app, db, storage };
