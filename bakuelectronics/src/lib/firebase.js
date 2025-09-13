import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcQViE1zofLtZzonS31XBXci9DYIoEMaI",
    authDomain: "login-register-502-17a22.firebaseapp.com",
    projectId: "login-register-502-17a22",
    storageBucket: "login-register-502-17a22.firebasestorage.app",
    messagingSenderId: "73644915363",
    appId: "1:73644915363:web:1fc9052d7f9c32e199dd16",
    measurementId: "G-B3GF6NJ6XE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
