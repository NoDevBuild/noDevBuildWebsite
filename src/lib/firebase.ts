import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYlOLvglHyq8ccCH-NJBE7Uy-nRi82ABE",
  authDomain: "nodevbuildweb.firebaseapp.com",
  projectId: "nodevbuildweb",
  storageBucket: "nodevbuildweb.appspot.com",
  messagingSenderId: "1027291490444",
  appId: "1:1027291490444:web:a8179a380a28ebadb2f3a9",
  measurementId: "G-G3T68V9SL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Initialize Firestore
const db = getFirestore(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Add additional OAuth 2.0 scopes if needed
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ')
});

export { auth, db, googleProvider };