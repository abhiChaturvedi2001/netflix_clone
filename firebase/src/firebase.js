// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyC6H8yTpqgk5OX3CMMVdVmwL2p2u2svO5g",
    authDomain: "fir-learn-76398.firebaseapp.com",
    projectId: "fir-learn-76398",
    storageBucket: "fir-learn-76398.appspot.com",
    messagingSenderId: "320627345151",
    appId: "1:320627345151:web:91e7a6f99a574346136eca",
    measurementId: "G-33789QKH9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
