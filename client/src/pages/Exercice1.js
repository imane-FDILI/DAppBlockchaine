import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Exercice1Contract from '../contracts/Exercice1.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice1() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [result, setResult] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
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
      const ids = Object.keys(Exercice1Contract.networks);
      const deployedNetwork = Exercice1Contract.networks[ids[0]];
      const contract = new instanceWeb3.eth.Contract(Exercice1Contract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const addition1 = async () => {
    const { contract } = state;
    const res = await contract.methods.addition1().call();
    setResult('addition1() = ' + res.toString());
  };

  const addition2 = async () => {
    const { contract } = state;
    const res = await contract.methods.addition2(num1, num2).call();
    setResult('addition2(' + num1 + ', ' + num2 + ') = ' + res.toString());
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 1</span>
        <h1 className="exo-titre">Somme de deux variables</h1>
      </header>

      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">addition1() — somme des variables d'état</h2>
          <button className="exo-btn" onClick={addition1}>Calculer</button>
        </div>

        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">addition2() — somme de deux paramètres</h2>
          <div className="exo-form">
            <input
              type="number"
              placeholder="Nombre 1"
              value={num1}
              onChange={e => setNum1(e.target.value)}
              className="exo-input"
            />
            <input
              type="number"
              placeholder="Nombre 2"
              value={num2}
              onChange={e => setNum2(e.target.value)}
              className="exo-input"
            />
            <button className="exo-btn" onClick={addition2}>Calculer</button>
          </div>
        </div>

        {result && (
          <div className="exo-resultat">
            Résultat : {result}
          </div>
        )}

        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>

      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice1;
