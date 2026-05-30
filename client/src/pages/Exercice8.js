import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import PaymentContract from '../contracts/Payment.json';
import BlockchainInfo from '../components/BlockchainInfo';
function Exercice8() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [montant, setMontant] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');
    async function initWeb3() {
      const instanceWeb3 = new Web3(provider);
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = PaymentContract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(PaymentContract.abi, deployedNetwork.address);
      const accounts = await instanceWeb3.eth.getAccounts();
      setAccount(accounts[0]);
      setState({ web3: instanceWeb3, contract: contract });
    }
    provider && initWeb3();
  }, []);

  const receivePayment = async () => {
    const { contract, web3 } = state;
    const valeur = web3.utils.toWei(montant, 'ether');
    await contract.methods.receivePayment().send({ from: account, value: valeur });
    setResult('Paiement de ' + montant + ' ETH reçu ');
  };

  const withdraw = async () => {
    const { contract } = state;
    await contract.methods.withdraw().send({ from: account });
    setResult('Retrait effectué ');
  };

  return (
    <div>
      <div style={{ background: '#1a56db', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px' }}>Exercice 8 : Utilisation des variables globales</h1>
      </div>
      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>receivePayment()</h2>
          <input type="number" min="0" placeholder="Montant en ETH" value={montant} onChange={e => setMontant(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '180px' }} />
          <button onClick={receivePayment} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Envoyer
          </button>
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>withdraw()</h2>
          <button onClick={withdraw} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Retirer
          </button>
        </div>
        {result && (
          <div style={{ background: '#e6f1fb', border: '1px solid #1a56db', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', color: '#1a56db', fontWeight: '500' }}>
            {result}
          </div>
        )}
        <Link to="/" style={{ color: '#1a56db', fontSize: '14px' }}>← Sommaire</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice8;