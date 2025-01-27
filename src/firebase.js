import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU4GZeSKmQCK3ujIZnWUZSF51qDFgx0-8",
  authDomain: "idcl-a4c50.firebaseapp.com",
  projectId: "idcl-a4c50",
  storageBucket: "idcl-a4c50.firebasestorage.app",
  messagingSenderId: "806810776631",
  appId: "1:806810776631:web:63252d1d7589323ecc7bb2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
