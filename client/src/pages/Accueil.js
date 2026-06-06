import React from "react";
import { Link } from "react-router-dom";
import "../styles/Accueil.css";

export default function Home() {


  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="brand">
          <span className="logo" />
          BolockDApp
        </div>
        <ul className="nav-links">
          <li className="active"><a href="#top">ACCUEIL</a></li>
          <li><Link to="/exercices">EXERCICES</Link></li>
        </ul>
      </nav>

      <header className="hero" id="top">
        <div className="hero-text">
          <h1 className="hero-title">Blockchain</h1>
          <p className="hero-sub">
            Application décentralisée pour exécuter et tester les 8 exercices
            Solidity du TP 3. Chaque exercice dispose de son interface dédiée,
            connectée aux contrats déployés via Truffle et  Ganache.
          </p>
          <Link to="/exercices" className="btn-cta">Commencer</Link>
        </div>
        <img src="/iconesite.png" className="logo-img" alt="Illustration blockchain" />
      </header>

      <footer className="landing-foot" id="info">
        Projet de Fin de Module — Développement d'une dApp pour le TP 3 ·
        Solidity, Truffle et ReactJS
      </footer>
    </div>
  );
}