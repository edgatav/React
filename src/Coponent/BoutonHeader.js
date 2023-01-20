import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function LogoutButton() {
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const auth = getAuth();

  
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      history('/');
    });
  };

  return user ? (
  <>
  <p>Bonjour, {user.displayName}</p>
  <button onClick={handleLogout}>Déconnexion</button> 
  </>
  ): <button onClick={()=> history('/')}>Identification</button>
}

export default LogoutButton;