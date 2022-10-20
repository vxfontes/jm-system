// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVCMohneNBE1c0rpUVPxLpGA8Vro3_7kI",
    authDomain: "jm-system.firebaseapp.com",
    databaseURL: "https://jm-system-default-rtdb.firebaseio.com",
    projectId: "jm-system",
    storageBucket: "jm-system.appspot.com",
    messagingSenderId: "639254228750",
    appId: "1:639254228750:web:7847e9ad9e0cc496b0315f",
    measurementId: "G-90ZBV5W9Q7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dataBaseApp = getFirestore(app)