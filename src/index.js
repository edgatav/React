import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Coponent/App';
import reportWebVitals from './reportWebVitals';
import Header from "./Coponent/Header.js";
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import HomePage from './Coponent/HomePage';
import SignUpForm from './Coponent/Inscription';
import Character from './Coponent/Character';
import Episode from './Coponent/Episode';
import EpisodeList from './Coponent/EpisodeListe';
import Favoris from './Coponent/Favoris';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign" element={<SignUpForm />}/>
        <Route path="/home" element={<App />} />
        <Route path="/home/personnage/:id" element={<Character />}/>
        <Route path="/home/episode/:id" element={<Episode />}/>
      <Route path="/home/episode" element={<EpisodeList />} />
      <Route path="/home/favori" element={<Favoris />} />
      {/* //<Route path="/episode" element={<EpisodeList />} /> */}

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 