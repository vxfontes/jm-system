// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../src/utils/firebaseKey.js'

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBaseApp = getFirestore(app)