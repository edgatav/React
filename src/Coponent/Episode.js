
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EpisodeCharacters from './EpisodeCharacters';
import Header from './Header';
import LogoutButton from './BoutonHeader';
import rickandmorty from "./rickandmorty.png";
import { Link } from 'react-router-dom';

const Episode = () => {
  const [episodes, setEpisodes] = useState([]);
  const id = window.location.pathname.split('/').pop();

  useEffect(() => {
    
    const fetchData = async () => {
      const result = await axios(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      setEpisodes(result.data);
    };
    
    fetchData();
  },[id]);
  

  
  return (
    <div>
      <Header/> 

        <h1>{episodes.name}</h1>
          <p>Episode numéro: {episodes.episode}</p>
          <p>Date de diffusion: {episodes.air_date}</p>
          <EpisodeCharacters episodeId={episodes.id} />
    </div>
  );
  
};

export default Episode;
