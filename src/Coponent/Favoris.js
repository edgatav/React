import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Characters from './Characters';
import { getDoc, getFirestore } from 'firebase/firestore';
import { collection, ref, setDoc, doc, updateDoc, get } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import Header from './Header';

const Favoris = () => {
  const db = getFirestore();
  const [favoriteCharactersIds, setFavoriteCharactersIds] = useState([]);
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "favorite", auth.currentUser.uid));
        if (docSnap.exists) {
          const favoriteIds = [];
          for (let i = 1; i < 827; i++) {
            if (docSnap.data()[i]) {
              favoriteIds.push(i);
            }
          }
          setFavoriteCharactersIds(favoriteIds);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    if (user) {
      fetchData();
    }
  }, [auth, db, user]);

  return user ? (
    <div>
      <Header />
      <h1>Personnages favoris</h1>
      <ul>
        {favoriteCharactersIds.length ? (
          favoriteCharactersIds.map(character => (
            <li key={character}><Characters characterId={character} /></li>
          ))
        ) : (
            <p>Aucun favoris <Link to="./episode">liste des épisodes</Link></p>
          )}
      </ul>
    </div>
  ) : (
      <div>
        <Header />
        <p>Non connecté</p>
      </div>
    );
};

export default Favoris;