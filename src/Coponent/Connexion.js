import React, { useState } from 'react';
import {initializeApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate } from "react-router-dom";
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
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = getAuth();
  let history =useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth,email, password)
      .then(() => {
        console.log('User logged in:', auth.currentUser.email);
        history("/home");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;