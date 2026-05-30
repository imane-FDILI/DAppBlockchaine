import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Projet de Fin de Module</h1>
        <h2>Développement d'une dApp pour le TP 3</h2>
        <p>Solidity, Truffle et ReactJS</p>
      </div>
      <div className="home-links">
        <div className="link-item"><span className="num">1</span><Link to="/exercice1">Exercice 1 : Somme de deux variables</Link></div>
        <div className="link-item"><span className="num">2</span><Link to="/exercice2">Exercice 2 : Conversion des cryptomonnaies</Link></div>
        <div className="link-item"><span className="num">3</span><Link to="/exercice3">Exercice 3 : Traitement des chaînes de caractères</Link></div>
        <div className="link-item"><span className="num">4</span><Link to="/exercice4">Exercice 4 : Tester le signe d'un nombre</Link></div>
        <div className="link-item"><span className="num">5</span><Link to="/exercice5">Exercice 5 : Tester la parité d'un nombre</Link></div>
        <div className="link-item"><span className="num">6</span><Link to="/exercice6">Exercice 6 : Gestion des tableaux</Link></div>
        <div className="link-item"><span className="num">7</span><Link to="/exercice7">Exercice 7 : Programmation Orientée Objet (Formes géométriques)</Link></div>
        <div className="link-item"><span className="num">8</span><Link to="/exercice8">Exercice 8 : Utilisation des variables globales (msg.sender et msg.value)</Link></div>
      </div>
    </div>
  );
}

export default Home;