
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EpisodeCharacters from './EpisodeCharacters';

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
