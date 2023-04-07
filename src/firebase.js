// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9zw-rn3U49hl9T6bqzUELcw-ULD1AAnM",
  authDomain: "rivaswebapp.firebaseapp.com",
  databaseURL: "https://rivaswebapp-default-rtdb.firebaseio.com",
  projectId: "rivaswebapp",
  storageBucket: "rivaswebapp.appspot.com",
  messagingSenderId: "659657185711",
  appId: "1:659657185711:web:6dec586ed6f99cff1a775a",
  measurementId: "G-WWYFPHDW1V"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
