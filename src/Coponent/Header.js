import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
    RouterProvider,
    createBrowserRouter
  } from "react-router-dom";
import rickandmorty from "./rickandmorty.png";
import "./Header.css";
import App from "./App.js";
import EpisodeList from "./EpisodeListe.js";
import Character from "./Character";
import Episode from "./Episode";
import Favoris from "./Favoris";

function Header(){
return(

<div>
  
    <img  class="imghead" src = {rickandmorty} />
    <nav>
      <Link to="./acceuil"  className="navLink">Accueil</Link>
      <Link to="./episode" className="navLink">Episode</Link>
      <Link to="./favori" className="navLink">Favori</Link>
    </nav>

</div>
);
}
export default Header;