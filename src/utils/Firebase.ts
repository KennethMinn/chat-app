// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtPbqCN7tL95df6jtNQPaIXDrrNp0b2jY",
  authDomain: "chat-app-a8193.firebaseapp.com",
  projectId: "chat-app-a8193",
  storageBucket: "chat-app-a8193.appspot.com",
  messagingSenderId: "45507736857",
  appId: "1:45507736857:web:881a2d0cafb12d8e448188",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
