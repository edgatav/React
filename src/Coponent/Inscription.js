
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";


export const handleSubmit = (event, auth, email, password, setError, db, history) => {
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
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setDoc(doc(db, "favorite", auth.currentUser.uid), {
        1: false
      });
      signInWithEmailAndPassword(auth, email, password);
      history("/home");
    })
    .catch((error) => {
      setError(error.message);
    });
};

function SignUpForm() {
  const db = getFirestore();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  let history = useNavigate();

  return (
    <form onSubmit={(event) => handleSubmit(event, auth, email, password, setError, db, history)}>
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