import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAPPpPxYrHECxoiTVVf21yu5BqdUdxJ9BQ",
  authDomain: "top-marble.firebaseapp.com",
  projectId: "top-marble",
  storageBucket: "top-marble.firebasestorage.app",
  messagingSenderId: "734630534288",
  appId: "1:734630534288:web:e68cd6ccf3f2ff4e5b0c15",
  measurementId: "G-7W44GWN02F",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

export default app
