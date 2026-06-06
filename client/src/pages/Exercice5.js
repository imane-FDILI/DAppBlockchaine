import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Exercice5Contract from '../contracts/Exercice5.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice5() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });
  const [nombre, setNombre] = useState('');
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

      console.log("=== DEBUG EXERCICE 5 ===");
      console.log("networkId =", networkId, "type:", typeof networkId);
      console.log("networks dispo =", Exercice5Contract.networks);
      console.log("cles =", Object.keys(Exercice5Contract.networks));

      const ids = Object.keys(Exercice5Contract.networks);
      const deployedNetwork = Exercice5Contract.networks[ids[ids.length - 1]];
      console.log("deployedNetwork =", deployedNetwork);

      const contract = new instanceWeb3.eth.Contract(Exercice5Contract.abi, deployedNetwork.address);
      console.log("contract cree =", contract);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);
  
  const estPair = async () => {
    const res = await state.contract.methods.estPair(nombre).call();
    setResult('Le nombre ' + nombre + ' est : ' + res);
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 5</span>
        <h1 className="exo-titre">Tester la parité d'un nombre</h1>
      </header>
      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">estPair()</h2>
          <div className="exo-form">
            <input className="exo-input" type="number" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <button className="exo-btn" onClick={estPair}>Tester</button>
          </div>
        </div>
        {result && <div className="exo-resultat">{result}</div>}
        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice5;