import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdOZAu_4_eqmnWq6eWtRaMB8OYD7ImG3E",
    authDomain: "plantstock-f8cfc.firebaseapp.com",
    projectId: "plantstock-f8cfc",
    storageBucket: "plantstock-f8cfc.appspot.com",
    messagingSenderId: "939049368274",
    appId: "1:939049368274:web:ca1164ef33dde0e3fc8b0b"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth();

  export { db, auth }

 