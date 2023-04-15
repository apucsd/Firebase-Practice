// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtN95JdO9LDMRZSAKyE08_cLYQj1mePTk",
  authDomain: "practice-task-a04b1.firebaseapp.com",
  projectId: "practice-task-a04b1",
  storageBucket: "practice-task-a04b1.appspot.com",
  messagingSenderId: "567024616925",
  appId: "1:567024616925:web:d1d2a841676fe76d022234",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
