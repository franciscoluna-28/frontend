// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import axios from "axios";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Handling the authentication
export const auth: Auth = getAuth();

// Getting the firestore setup
export const db = getFirestore();



export async function signup(email: string, password: string) {
  try {
    // Crear el usuario en Firebase

    
    await createUserWithEmailAndPassword(auth, email, password);
    
    await axios.post("http://localhost:3000/users/register-user", {
      email: auth.currentUser?.email,
      uid: auth.currentUser?.uid,
    });








    // Resto del código para manejar el resultado de la solicitud o realizar otras acciones necesarias
  } catch (error) {
    // Error al registrar el usuario en el backend
    console.error("Error al registrar el usuario:", error);
    // Resto del código para manejar el error o mostrar un mensaje de error al usuario
  }




}

export function logout() {
  return signOut(auth);
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function signupWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

const analytics = getAnalytics(app);
console.log(analytics);
