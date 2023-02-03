
 import React, { useState, useEffect } from 'react';
 import Characters from './Characters';
 import Header from './Header';
 import { getAuth } from "firebase/auth";
 import { doc, getDoc } from 'firebase/firestore';
 import { getFirestore } from 'firebase/firestore';
 
 const App = () => {
   const [randomCharactersIds, setRandomCharactersIds] = useState([]);
   const [favoriteCharactersIds, setFavoriteCharactersIds] = useState([]);
   const auth = getAuth();
   const db = getFirestore();
 
   useEffect(() => {
     const fetchFavorites = async () => {
       const docSnap = await getDoc(doc(db, "favorite", auth.currentUser.uid));
       if (docSnap.exists) {
         const favoriteIds = [];
         for (const key in docSnap.data()) {
          if (docSnap.data()[key]) {
            favoriteIds.push({ id: key, timeStamp: docSnap.data()[key].timeStamp });
          }
          }
         favoriteIds.sort((a, b) => b.timeStamp - a.timeStamp);
         const lastFiveFavoriteIds = favoriteIds.slice(0, 5).map(id => parseInt(id.id, 10));
         setFavoriteCharactersIds(lastFiveFavoriteIds);
       } else {
         console.log("No such document!");
       }
     };
 
     const generateRandomIds = () => {
       const Randchar = [];
       for (let i = 0; i < 5; i++) {
         Randchar.push(Math.ceil(Math.random() * 826));
       }
       setRandomCharactersIds(Randchar);
     };
 
     fetchFavorites();
     generateRandomIds();
   }, []);
 
   return auth.currentUser ? (
     <div>
       <Header />
       <h1>Personnages aléatoires</h1>
       <ul>
         {randomCharactersIds.map(character => (
           <li key={character}><Characters characterId={character} /></li>
         ))}
       </ul>
       <h1>Personnages favoris</h1>
       <ul>
         {favoriteCharactersIds.map(favorite => (
           <li key={favorite}><Characters characterId={favorite} /></li>
         ))}
       </ul>
     </div>
   ) : (
     <div>
       <Header />
       <h1>Personnages aléatoires</h1>
       <ul>
         {randomCharactersIds.map(character => (
           <li key={character}><Characters characterId={character} /></li>
         ))}
       </ul>
     </div>
   );
 };
 
 export default App;
