// Import the functions you need from the SDKs you need
import { connectAuthEmulator, getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCt06SCKft69PIDqJq6SGn5qKmVQIZczM",
  authDomain: "beefone-403117.firebaseapp.com",
  projectId: "beefone-403117",
  storageBucket: "beefone-403117.appspot.com",
  messagingSenderId: "1005781916306",
  appId: "1:1005781916306:web:a12aacf4fe12fdcbd5644b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore();
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");