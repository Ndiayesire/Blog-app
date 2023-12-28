import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAs1-TA1GJqNjc6BxlP7_GGddZqLKD2e5A",
  authDomain: "blog-d91a9.firebaseapp.com",
  projectId: "blog-d91a9",
  storageBucket: "blog-d91a9.appspot.com",
  messagingSenderId: "144929617875",
  appId: "1:144929617875:web:d96e749a8a7f2dd48ca126",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };
