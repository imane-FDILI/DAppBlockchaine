import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Exercice6Contract from '../contracts/Exercice6.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice6() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });
  const [valeur, setValeur] = useState('');
  const [index, setIndex] = useState('');
  const [result, setResult] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function initWeb3() {
      if (!window.ethereum) {
        alert("MetaMask n'est pas installé !");
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const instanceWeb3 = new Web3(window.ethereum);
      const accounts = await instanceWeb3.eth.getAccounts();
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = Exercice6Contract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(Exercice6Contract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const ajouterNombre = async () => {
    const { contract, account } = state;
    const recu = await contract.methods.ajouterNombre(valeur).send({ from: account });
    setTransactions([recu, ...transactions]);
    setResult('Nombre ' + valeur + ' ajouté');
  };
  const afficheTableau = async () => {
    const res = await state.contract.methods.afficheTableau().call();
    setResult('Tableau : [' + res.join(', ') + ']');
  };
  const getElement = async () => {
    try {
      const res = await state.contract.methods.getElement(index).call();
      setResult("Element à l'indice " + index + ' : ' + res.toString());
    } catch (e) {
      setResult("Erreur : l'indice " + index + " n'existe pas dans le tableau");
    }
  };
  const calculerSomme = async () => {
    const res = await state.contract.methods.calculerSomme().call();
    setResult('Somme : ' + res.toString());
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 6</span>
        <h1 className="exo-titre">Gestion des tableaux</h1>
      </header>
      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">Ajouter / consulter</h2>
          <div className="exo-form">
            <input className="exo-input" type="number" placeholder="Valeur" value={valeur} onChange={e => setValeur(e.target.value)} />
            <button className="exo-btn" onClick={ajouterNombre}>Ajouter (tx)</button>
          </div>
          <div className="exo-form" style={{ marginTop: '12px' }}>
            <input className="exo-input" type="number" placeholder="Indice" value={index} onChange={e => setIndex(e.target.value)} />
            <button className="exo-btn" onClick={getElement}> élément</button>
            <button className="exo-btn" onClick={afficheTableau}>Afficher tableau</button>
            <button className="exo-btn" onClick={calculerSomme}>Somme</button>
          </div>
        </div>
        {result && <div className="exo-resultat">{result}</div>}
        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice6;