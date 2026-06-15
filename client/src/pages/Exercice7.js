import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import RectangleContract from '../contracts/Rectangle.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice7() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });
  const [dx, setDx] = useState('');
  const [dy, setDy] = useState('');
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

      const networkId = (await instanceWeb3.eth.net.getId()).toString();
      let deployedNetwork = RectangleContract.networks[networkId];
      if (!deployedNetwork) {
        const ids = Object.keys(RectangleContract.networks);
        if (ids.length === 0) {
          setResult("Erreur : le contrat n'est pas déployé. Lancez 'truffle migrate --reset'.");
          return;
        }
        deployedNetwork = RectangleContract.networks[ids[ids.length - 1]];
      }

      const contract = new instanceWeb3.eth.Contract(RectangleContract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const surface = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.surface().call();
    setResult('Surface = ' + res.toString());
  };
  const afficheXY = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.afficheXY().call();
    setResult('Coordonnées : x=' + res[0] + ', y=' + res[1]);
  };
  const afficheInfos = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.afficheInfos().call();
    setResult(res);
  };
  const afficheLoLa = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.afficheLoLa().call();
    setResult('Longueur=' + res[0] + ', Largeur=' + res[1]);
  };
  const deplacerForme = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    try {
      const recu = await state.contract.methods.deplacerForme(dx, dy).send({ from: state.account });
      setTransactions([recu, ...transactions]);
      setResult('Forme déplacée de (' + dx + ', ' + dy + ')');
    } catch (e) {
      setResult('Transaction annulée ou échouée : ' + (e.message || e));
    }
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 7</span>
        <h1 className="exo-titre">POO — Formes géométriques </h1>
      </header>
      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">Consultation</h2>
          <div className="exo-form">
            <button className="exo-btn" onClick={surface}>Surface</button>
            <button className="exo-btn" onClick={afficheXY}>Coordonnées</button>
            <button className="exo-btn" onClick={afficheInfos}>Infos</button>
            <button className="exo-btn" onClick={afficheLoLa}>Longueur / Largeur</button>
          </div>
        </div>
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">Déplacer la forme</h2>
          <div className="exo-form">
            <input className="exo-input" type="number" placeholder="dx" value={dx} onChange={e => setDx(e.target.value)} />
            <input className="exo-input" type="number" placeholder="dy" value={dy} onChange={e => setDy(e.target.value)} />
            <button className="exo-btn" onClick={deplacerForme}>Déplacer (tx)</button>
          </div>
        </div>
        {result && <div className="exo-resultat">{result}</div>}
        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice7;