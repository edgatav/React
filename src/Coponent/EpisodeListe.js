
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EpisodeCharacters from './EpisodeCharacters';
import Header from './Header';
import rickandmorty from "./rickandmorty.png";
import { Link } from 'react-router-dom';
import LogoutButton from './BoutonHeader';

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios(
        `https://rickandmortyapi.com/api/episode/?page=${page}`
      );
      
      setEpisodes(episodes.concat(result.data.results));
      setLoading(false);
      setHasMore(result.data.info.next !== null);
    
    };
    
    fetchData();
  }, [page]);
  

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  
  return (
    <div>
      <img  class="imghead" src = {rickandmorty} />
      <LogoutButton/>
    <nav>
      <Link to="/home"  className="navLink">Accueil</Link>
      <Link to="/home/episode" className="navLink">Episode</Link>
      <Link to="/home/favori" className="navLink">Favori</Link>
    </nav>
        {episodes.map(episode => (
          <><h1 key={episode.id}> {episode.name}</h1>
          <p key={episode.id}>Numéro d'episode: {episode.episode}</p>
          <p key={episode.id}>Date de sortie: {episode.air_date}</p>
          <EpisodeCharacters episodeId={episode.id} />
          </>
        ))}
        {loading ? (
        <p>Chargement...</p>
      ) : hasMore ? (
        <button onClick={handleLoadMore}>Charger plus</button>
      ) : (
        <p>Plus d'episode a charger</p>
      )}

    </div>
  );
  
};

export default EpisodeList;
