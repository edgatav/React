import { Link } from 'react-router-dom';
import FavoritesButton from './Favori';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Characters = ({ characterId }) => {
  const [character, setCharacter] = useState({});
  

  useEffect(() => {
    if (characterId !== undefined){
    const fetchData = async () => {
      const result = await axios(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );

      setCharacter(result.data);
    };

    fetchData();};
  }, [characterId]);


  var linkpers = "/personnage/" + characterId;
  if (characterId == undefined){
    return (
      <div class="box">
      </div>
    );
  } else {
  return (
    <div class="box">
      <h1>{character.name}</h1>
       <img class="mini" src={character.image} alt="{character.name} "/>
      <Link to = {linkpers} >Description</Link>
      <FavoritesButton characterId={characterId} />
    </div>
  );
};
};

export default Characters;