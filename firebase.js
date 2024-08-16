// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseAPI = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: firebaseAPI,
  authDomain: "flashcardsaas-38a24.firebaseapp.com",
  projectId: "flashcardsaas-38a24",
  storageBucket: "flashcardsaas-38a24.appspot.com",
  messagingSenderId: "736711634388",
  appId: "1:736711634388:web:b9f1e2fb36d1a6a4393a41",
  measurementId: "G-EVWHPFMM73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)


export {db}