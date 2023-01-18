
import {useNavigate } from "react-router-dom";
import {initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


import { useState } from "react";
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

function SignUpForm() {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    let history =useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError('Email is not valid');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setError(null);
    createUserWithEmailAndPassword(auth,email, password)
      .then(() => {
        signInWithEmailAndPassword(auth,email, password); 
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
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUpForm;
