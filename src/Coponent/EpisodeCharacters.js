import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Characters from './Characters';

const EpisodeCharacters = ({ episodeId }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      );

      setCharacters(result.data.characters);
    };

    fetchData();
  }, [episodeId]);

  return (
    <ul>
      {characters.map(characterUrl => (
        <p key={characterUrl}>
          <Characters characterId={characterUrl.split('/').pop()} />
        </p>
      ))}
    </ul>
  );
};

export default EpisodeCharacters;