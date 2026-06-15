import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Exercice4Contract from '../contracts/Exercice4.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice4() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });
  const [nombre, setNombre] = useState('');
  const [result, setResult] = useState('');
  const [transactions] = useState([]);

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
      const deployedNetwork = Exercice4Contract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(Exercice4Contract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const estPositif = async () => {
    const res = await state.contract.methods.estPositif(nombre).call();
    setResult(res ? 'Le nombre est POSITIF' : "Le nombre n'est PAS positif");
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 4</span>
        <h1 className="exo-titre">Tester le signe d'un nombre</h1>
      </header>
      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">estPositif()</h2>
          <div className="exo-form">
            <input className="exo-input" type="number" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <button className="exo-btn" onClick={estPositif}>Tester</button>
          </div>
        </div>
        {result && <div className="exo-resultat">{result}</div>}
        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}
export default Exercice4;