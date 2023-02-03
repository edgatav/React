import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { getDoc,getDocs, getFirestore } from 'firebase/firestore';
import { collection , ref , setDoc, doc,updateDoc, get} from 'firebase/firestore';
const FavoritesButton = ({ characterId }) => {
  const [user, setUser] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  //const querySnapshot = getDoc(doc(db, "favorite",auth.currentUser.uid));
  const id = [];
    useEffect(() => {
    return auth.onAuthStateChanged( (user) => {
      if (user) {
        setUser(user);
        getDoc(doc(db, "favorite", auth.currentUser.uid)).then(docSnap => {
          if (docSnap.exists()) {
           setIsFavorited(docSnap.data()[characterId]);
          } else {
            console.log("No such document!");
          }
        })
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleClick = () => {
    if (user) {
      if (isFavorited) {
        setIsFavorited(false);
        updateDoc(doc(db, "favorite", auth.currentUser.uid), {
        [characterId]:false
        });
      } else {
        setIsFavorited(true);
        updateDoc(doc(db, "favorite", auth.currentUser.uid), {
          [characterId]:true
        });
        
      }
    }
  };

  return user ? (
    <button onClick={handleClick}>
      {isFavorited ? (
        <FaHeart color="#FF0000" />
      ) : (
        <FaHeart color="#542201" />
      )}
    </button>
  ) : (
    <p></p>
  );
};

export default FavoritesButton;