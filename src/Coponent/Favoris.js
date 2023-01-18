import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Characters from './Characters';
import rickandmorty from "./rickandmorty.png";
import Header from './Header';
const Favoris = () => {
  const [favoriteCharactersIds, setFavoriteCharactersIds] = useState([]);
  const cookies = new Cookies();
  const favoriteIds = [];
  const [NotNothing, setNotNothing] = useState("false");
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
    
}, []);
if (NotNothing === "false"){
  return (
    <div>
    <img  class="imghead" src = {rickandmorty} />
    <nav>
      <Link to="/home"  className="navLink">Accueil</Link>
      <Link to="/home/episode" className="navLink">Episode</Link>
      <Link to="/home/favori" className="navLink">Favori</Link>
    </nav>
    <h1> Personnages favoris</h1>
    <ul>
     <p> Aucun favoris <Link to="./episode" >liste des épisodes</Link></p>
      </ul></div>
  );
} else {
return (
  <div>
 <img  class="imghead" src = {rickandmorty} />
    <nav>
      <Link to="/home"  className="navLink">Accueil</Link>
      <Link to="/home/episode" className="navLink">Episode</Link>
      <Link to="/home/favori" className="navLink">Favori</Link>
    </nav>
  <h1> Personnages favoris</h1>
  <ul>
   {favoriteCharactersIds.map(character => (
    <li key={character}><Characters characterId={character}/></li>
  ))}
    </ul></div>
);     
    
};  
  
};
export default Favoris;