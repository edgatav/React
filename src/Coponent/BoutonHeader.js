import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  <p>Bonjour !</p>
  <button onClick={handleLogout}>Déconnexion</button> 
  <nav>
      <Link to="/home"  className="navLink">Accueil</Link>
      <Link to="/home/episode" className="navLink">Episode</Link>
      <Link to="/home/favori" className="navLink">Favori</Link>
    </nav> 
  </>
  ): (
    <>
  <button onClick={()=> history('/')}>Identification</button>
  <nav>
      <Link to="/home"  className="navLink">Accueil</Link>
      <Link to="/home/episode" className="navLink">Episode</Link>
    </nav>
  </>
  )
}

export default LogoutButton;