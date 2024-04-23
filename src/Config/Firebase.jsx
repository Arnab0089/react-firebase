// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZktEurRQvNjeg0i1yOFhb1aW2YvBMHXk",
  authDomain: "sample1-c7a6e.firebaseapp.com",
  projectId: "sample1-c7a6e",
  storageBucket: "sample1-c7a6e.appspot.com",
  messagingSenderId: "481608481387",
  appId: "1:481608481387:web:bab355699ecd1a1cf74f2e",
  measurementId: "G-64Y6DS6N9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)

export const googleProvider=new GoogleAuthProvider()

export const db=getFirestore(app)

export const storage=getStorage(app)