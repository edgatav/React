import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Characters from './Characters';
import rickandmorty from "./rickandmorty.png";
import LogoutButton from './BoutonHeader';
import { getAuth } from "firebase/auth";
import Header from './Header';
const Favoris = () => {
  const [favoriteCharactersIds, setFavoriteCharactersIds] = useState([]);
  const cookies = new Cookies();
  const favoriteIds = [];
  const [NotNothing, setNotNothing] = useState("false");
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    var j =1;

    console.log(cookies.getAll());
    for (let i = 0; i < Number(cookies.get("number")); i++) {
      while (cookies.get(j) === undefined){
        j = j + 1

    };
    console.log(cookies.get(j));
    const cookieValue = cookies.get(j);
      if (cookieValue === 'true') {
        favoriteIds.push(j);
        setNotNothing("true");
      }
      j = j + 1
    }
    setFavoriteCharactersIds(favoriteIds);
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    
}, []);

if (NotNothing === "false"){
  return user ?  (
    <div>
    <Header/> 
    <h1> Personnages favoris</h1>
    <ul>
     <p> Aucun favoris <Link to="./episode" >liste des épisodes</Link></p>
      </ul></div>
  ) : (
    <div>
    <Header/> 
  <p>Non connecter</p>
  </div>
  )
} else {
return user ? (
  <div>
 <Header/> 
  <h1> Personnages favoris</h1>
  <ul>
   {favoriteCharactersIds.map(character => (
    <li key={character}><Characters characterId={character}/></li>
  ))}
    </ul></div>
): (
  <div>
  <Header/> 
<p>Non connecter</p>
</div>
)    
    
};  
  
};
export default Favoris;