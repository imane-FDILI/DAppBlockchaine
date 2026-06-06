import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Exercice2Contract from '../contracts/Exercice2.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice2() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [montant, setMontant] = useState('');
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
      const deployedNetwork = Exercice2Contract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(Exercice2Contract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const etherEnWei = async () => {
    const { contract } = state;
    const res = await contract.methods.etherEnWei(montant).call();
    setResult('Résultat : ' + res.toString() + ' Wei');
  };

  const weiEnEther = async () => {
    const { contract } = state;
    const res = await contract.methods.weiEnEther(montant).call();
    setResult('Résultat : ' + res.toString() + ' Ether');
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 2</span>
        <h1 className="exo-titre">Conversion des cryptomonnaies</h1>
      </header>

      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">Montant à convertir</h2>
          <div className="exo-form">
            <input
              type="number"
              min="0"
              placeholder="Montant"
              value={montant}
              onChange={e => setMontant(e.target.value)}
              className="exo-input"
            />
            <button className="exo-btn" onClick={etherEnWei}>Ether → Wei</button>
            <button className="exo-btn" onClick={weiEnEther}>Wei → Ether</button>
          </div>
        </div>

        {result && (
          <div className="exo-resultat">
            {result}
          </div>
        )}

        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>

      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice2;