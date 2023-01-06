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
import Personnage from "./Personnage.js";
import EpisodeList from "./EpisodeListe.js";
import Character from "./Character";
import Episode from "./Episode";
import Favoris from "./Favoris";

function Header(){
return(

<div>
    <img  class="imghead" src = {rickandmorty} />
    <nav>
      <Link to="/"  className="navLink">Accueil</Link>
      <Link to="/episode" className="navLink">Episode</Link>
      <Link to="/favori" className="navLink">Favori</Link>
    </nav>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/personnage/:id" element={<Character />}/>
        <Route path="/episode/:id" element={<Episode />}/>
      <Route path="/episode" element={<EpisodeList />} />
      <Route path="/favori" element={<Favoris />} />

    </Routes>

</div>
);
}
export default Header;