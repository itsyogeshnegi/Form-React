// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/database";
// import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm23xryeTBKWqpgFR4FTpdZloGNhzN4R8",
  authDomain: "formdata-aa243.firebaseapp.com",
  projectId: "formdata-aa243",
  storageBucket: "formdata-aa243.appspot.com",
  messagingSenderId: "344600892588",
  appId: "1:344600892588:web:77df3575bad828cb287b09",
  measurementId: "G-XQ2Z3LP9F2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
