// This file is kept for compatibility but no longer used for authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCjNXEXUWVNjYqEoRxLXYZxEJPwGVyJxY",
  authDomain: "nodevbuildweb.firebaseapp.com",
  projectId: "nodevbuildweb",
  storageBucket: "nodevbuildweb.appspot.com",
  messagingSenderId: "1098979667674",
  appId: "1:1098979667674:web:a6d65c6d0b4dd06c9f6c2e",
  measurementId: "G-RLXW6R5QE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };