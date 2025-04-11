// This file is kept for compatibility but no longer used for authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYlOLvglHyq8ccCH-NJBE7Uy-nRi82ABE",
  authDomain: "nodevbuildweb.firebaseapp.com",
  projectId: "nodevbuildweb",
  storageBucket: "nodevbuildweb.firebasestorage.app",
  messagingSenderId: "1027291490444",
  appId: "1:1027291490444:web:a8179a380a28ebadb2f3a9",
  measurementId: "G-G3T68V9SL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };