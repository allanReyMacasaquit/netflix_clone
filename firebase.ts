
import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyADW5_-rVkSpyY5HsI2HYhwrhVdt3ldTpc",
  authDomain: "netflix-clone-bf6e4.firebaseapp.com",
  projectId: "netflix-clone-bf6e4",
  storageBucket: "netflix-clone-bf6e4.appspot.com",
  messagingSenderId: "174269576034",
  appId: "1:174269576034:web:1910d5b92dd79bde55323b"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore()
export const auth = getAuth()
