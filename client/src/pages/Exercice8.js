import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import PaymentContract from '../contracts/Payment.json';
import BlockchainInfo from '../components/BlockchainInfo';

function Exercice8() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });
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
      const deployedNetwork = PaymentContract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(PaymentContract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const receivePayment = async () => {
    const { web3, contract, account } = state;
    const valeurWei = web3.utils.toWei(montant || '0', 'ether');
    const recu = await contract.methods.receivePayment().send({ from: account, value: valeurWei });
    setTransactions([recu, ...transactions]);
    setResult('Paiement de ' + montant + ' ETH reçu');
  };
  const withdraw = async () => {
    const { contract, account } = state;
    const recu = await contract.methods.withdraw().send({ from: account });
    setTransactions([recu, ...transactions]);
    setResult('Retrait effectué');
  };
  const voirRecipient = async () => {
    const res = await state.contract.methods.recipient().call();
    setResult('Destinataire : ' + res);
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 8</span>
        <h1 className="exo-titre">Variables globales (msg.sender et msg.value)</h1>
      </header>
      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">Paiement</h2>
          <div className="exo-form">
            <input className="exo-input" type="number" step="0.01" placeholder="Montant (ETH)" value={montant} onChange={e => setMontant(e.target.value)} />
            <button className="exo-btn" onClick={receivePayment}>Payer (tx)</button>
            <button className="exo-btn" onClick={withdraw}>Retirer (tx)</button>
            <button className="exo-btn" onClick={voirRecipient}>Voir destinataire</button>
          </div>
        </div>
        {result && <div className="exo-resultat">{result}</div>}
        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice8;