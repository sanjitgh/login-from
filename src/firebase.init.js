// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3oAKlfR5Nx9UvIy2k0QHxVxvaMD_6FxI",
  authDomain: "login-form-d4ef0.firebaseapp.com",
  projectId: "login-form-d4ef0",
  storageBucket: "login-form-d4ef0.firebasestorage.app",
  messagingSenderId: "1075407484275",
  appId: "1:1075407484275:web:aa25a60286867b41ac4106"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);