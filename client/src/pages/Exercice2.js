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
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');
    async function initWeb3() {
      const instanceWeb3 = new Web3(provider);
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = Exercice2Contract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(
        Exercice2Contract.abi,
        deployedNetwork.address
      );
      setState({ web3: instanceWeb3, contract: contract });
    }
    provider && initWeb3();
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
    <div>
      <div style={{ background: '#1a56db', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px' }}>Exercice 2 : Conversion des cryptomonnaies</h1>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Montant à convertir</h2>
          <input type="number" min="0" placeholder="Montant" value={montant} onChange={e => setMontant(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '150px' }} />
          <button onClick={etherEnWei} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', marginRight: '10px' }}>
            Ether → Wei
          </button>
          <button onClick={weiEnEther} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Wei → Ether
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

export default Exercice2;