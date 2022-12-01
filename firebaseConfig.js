// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, onSnapshot, getDocs, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYDUPALSkGEtEKctXdT3Pl0F4AkIiSPbw",
  authDomain: "kiosk-d46ae.firebaseapp.com",
  projectId: "kiosk-d46ae",
  storageBucket: "kiosk-d46ae.appspot.com",
  messagingSenderId: "786240399265",
  appId: "1:786240399265:web:84e9fc1c95b903c1404de0",
  measurementId: "G-PB2JNS3VGP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);


export {auth};

export default  getFirestore(app);
