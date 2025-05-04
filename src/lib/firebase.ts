// This file is kept for compatibility but no longer used for authentication
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Get environment configuration
const isProd = import.meta.env.VITE_PROJECT_ENV === 'prod';

// Firebase Configuration
const firebaseConfig = {
  apiKey: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_API_KEY 
    : import.meta.env.VITE_DEV_FIREBASE_API_KEY,
  authDomain: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_AUTH_DOMAIN 
    : import.meta.env.VITE_DEV_FIREBASE_AUTH_DOMAIN,
  projectId: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_PROJECT_ID 
    : import.meta.env.VITE_DEV_FIREBASE_PROJECT_ID,
  storageBucket: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_STORAGE_BUCKET 
    : import.meta.env.VITE_DEV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_MESSAGING_SENDER_ID 
    : import.meta.env.VITE_DEV_FIREBASE_MESSAGING_SENDER_ID,
  appId: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_APP_ID 
    : import.meta.env.VITE_DEV_FIREBASE_APP_ID,
  measurementId: isProd 
    ? import.meta.env.VITE_PROD_FIREBASE_MEASUREMENT_ID 
    : import.meta.env.VITE_DEV_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = getApps().length === 0 
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Initialize Auth
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };