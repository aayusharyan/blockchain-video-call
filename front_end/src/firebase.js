// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATshItVhHS6HNVx-TalIuzKXj2NHtkPvE",
  authDomain: "talkie-yush-dev.firebaseapp.com",
  projectId: "talkie-yush-dev",
  storageBucket: "talkie-yush-dev.appspot.com",
  messagingSenderId: "962789614682",
  appId: "1:962789614682:web:6e43cc56268631ea7c6463"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firebaseApp);