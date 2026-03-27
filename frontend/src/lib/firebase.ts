import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDwjcivxCQmA3HiC7wwPI_Ha1pQgGsL3I",
  authDomain: "aimoderationagent.firebaseapp.com",
  projectId: "aimoderationagent",
  storageBucket: "aimoderationagent.firebasestorage.app",
  messagingSenderId: "383390860703",
  appId: "1:383390860703:web:485f6d49a4e1b1e05969aa",
  measurementId: "G-9NTK1YT668"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
