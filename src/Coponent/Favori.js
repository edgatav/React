import React from 'react';
import { useState,useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Cookies from 'universal-cookie';
const FavoritesButton = ({characterId}) => {
  const cookies = new Cookies();
 const now = new Date();
    
   
     
      const [isCookieTrue, setIsCookieTrue] = useState( cookies.get(characterId) === "true");
  
  
  const handleClick = () => {
    
    if (cookies.get(characterId) === undefined) {
      
    
      if (cookies.get('number') === undefined) {
      cookies.set('number',"1");
      }else {
        var nomb =  Number(cookies.get('number')) + 1;
        cookies.set('number', nomb.toString(), { creationDate: now.getTime() });
      }
    
  };
    if (cookies.get(characterId) == "true") {
      cookies.set(characterId,"false", { creationDate: now.getTime() });
      setIsCookieTrue(false);
    } else {
      setIsCookieTrue(true);
      cookies.set(characterId,"true", { creationDate: now.getTime() });
    };
  };
  return (
    <button onClick={handleClick}>
      {isCookieTrue ? (
        <FaHeart color="#FF0000" />
      ) : (
        <FaHeart color='#542201' />
      )}
    </button>
  );
};

export default FavoritesButton;