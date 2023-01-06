import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoritesButton from './Favori';

const Episodes = ({ episodeId }) => {
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      );

      setEpisode(result.data);
    };
 
    fetchData();
  }, [episodeId]);
  
     var linkpers = "/episode/" + episodeId;
  return (
    <div class="box">      
      <h4>{episode.name}</h4>      
      <Link to = {linkpers} >Description</Link>
      
    </div>
  );
};

export default Episodes;