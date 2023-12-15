// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import Home from './Home'
//import { BrowserRouter, Routes, Route } from 'react-router-dom'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxNZaLexUalyTdqw34DT59aQjV5ZfufNs",
  authDomain: "unwindfinal.firebaseapp.com",
  projectId: "unwindfinal",
  storageBucket: "unwindfinal.appspot.com",
  messagingSenderId: "972605040104",
  appId: "1:972605040104:web:d045bb74818809ab3eb05d",
  measurementId: "G-7YK8L01PS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);

    })
    .catch((error) => {
        console.log(error);

    });

};