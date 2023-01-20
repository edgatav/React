
  import React, { useState, useEffect } from 'react';
  import Cookies from 'universal-cookie';
  import Characters from './Characters';
import Header from './Header';
import rickandmorty from "./rickandmorty.png";
import { Link } from 'react-router-dom';
import LogoutButton from './BoutonHeader';
import { getAuth } from "firebase/auth";
  const App = () => {
    const [CharactersIds, setCharactersIds] = useState([]);
    const [cookies, setCookies] = useState([]);
    const Randchar = [];
    const [user, setUser] = useState(null);
  const auth = getAuth();
  

    useEffect(() => {
      const fetchCookies = () => {
        const allCookies = new Cookies().getAll();
        const sortedCookies = Object.entries(allCookies)
          .map(([name, value]) => ({ name, value, creationDate: new Cookies().get(name, { doNotParse: true }).creationDate }))
          .sort((a, b) => a.creationDate - b.creationDate);

        const trueCookies = sortedCookies.filter(cookie => cookie.value === 'true');
        const lastFiveCookies = trueCookies.slice(-5);
        setCookies(lastFiveCookies);
      };
  
      fetchCookies();
    for (let i = 0; i < 5; i++){
        Randchar.push(Math.ceil(Math.random()*826));
    }
    
    setCharactersIds(Randchar);
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
}, []);
  return user ? (
    <div>
    <Header/> 
    <h1> Personnages aléatoires</h1>
    <ul>
      {CharactersIds.map(character => (
      <li key={character}><Characters characterId={character}/></li>
    ))}
    </ul>
    <h1> Personnages favoris</h1>
    <ul>
    {cookies.map(cookie => (
        <li key={cookie.name}><Characters characterId={cookie.name}/></li>
      ))}
      </ul>
    </div>
  ) : (
    <div>
    <Header/> 
    <h1> Personnages aléatoires</h1>
    <ul>
      {CharactersIds.map(character => (
      <li key={character}><Characters characterId={character}/></li>
    ))}
    </ul>
    </div>
  )
      
      
    
  };
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
export default App;
