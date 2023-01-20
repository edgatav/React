import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesButton from './Favori';
import Episodes from './Episodes';
import Header from './Header';
import rickandmorty from "./rickandmorty.png";
import { Link } from 'react-router-dom';
import LogoutButton from './BoutonHeader';
 


const Character = ( ) => {
  const [character, setCharacter] = useState({});
  const id = window.location.pathname.split('/').pop();
  const [episodes, setEpisodes] = useState([]);
  const [origin, setOrigin] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      setCharacter(result.data);
      setEpisodes(result.data.episode);
      setOrigin(result.data.origin);
    };
 
    fetchData();
  }, [id]);
 
  return (
    
    <div >  
      <img  class="imghead" src = {rickandmorty} />
      <LogoutButton/>
    <nav>
      <Link to="/home"  className="navLink">Accueil</Link>
      <Link to="/home/episode" className="navLink">Episode</Link>
      <Link to="/home/favori" className="navLink">Favori</Link>
    </nav>   
      <h4> {character.name}</h4> 
      <p>Status: {character.status}</p>
      <p>Genre: {character.gender}</p>
      <p>Type: {character.type}</p>  
      <p>Monde d'origine: {origin.name}</p>   
      <p><img  src={character.image} alt= "Image non trouver"/></p>
      <FavoritesButton characterId={id} />
      <h2>Episodes</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode}><Episodes episodeId={episode.split('/').pop()}/></li>
        ))}
      </ul>
    </div>
  );
};

export default Character;