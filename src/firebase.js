import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const config = {
    apiKey: "AIzaSyB90S8Bxjj6HR0M6dGLg1FFbY2BRGBDsyU",
   authDomain: "react-63d6e.firebaseapp.com",
   projectId: "react-63d6e",
   storageBucket: "react-63d6e.appspot.com",
   messagingSenderId: "67323651346",
   appId: "1:67323651346:web:cef8ea5548289e6a33bfcb",
   measurementId: "G-ZRWRHNVTR6"
  };
  initializeApp(config);
  const app = initializeApp(config);
export const db = getFirestore(app);


