import React from "react";
import { Link } from "react-router-dom";

const exercices = [
  { num: 1, titre: "Somme de deux variables" },
  { num: 2, titre: "Conversion des cryptomonnaies" },
  { num: 3, titre: "Traitement des chaînes de caractères" },
  { num: 4, titre: "Tester le signe d'un nombre" },
  { num: 5, titre: "Tester la parité d'un nombre" },
  { num: 6, titre: "Gestion des tableaux" },
  { num: 7, titre: "Formes géométriques" },
  { num: 8, titre: "Payement" },
];

function Exercice() {
  return (
    <div className="exercices">
      <Link to="/" className="exercices-retour">← Accueil</Link>
      <h1 className="exercices-titre">Explorez les exercices</h1>
      <div className="exercices-grille">
        {exercices.map((ex) => (
          <Link key={ex.num} to={`/exercice${ex.num}`} className="carte-exercice">
            <span className="carte-num">{ex.num}</span>
            <span className="carte-titre">{ex.titre}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Exercice;