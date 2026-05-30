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
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');
    async function initWeb3() {
      const instanceWeb3 = new Web3(provider);
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = Exercice1Contract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(Exercice1Contract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract });
    }
    provider && initWeb3();
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
    <div>
      <div style={{ background: '#1a56db', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px' }}>Exercice 1 : Somme de deux variables</h1>
      </div>
      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>addition1() — somme des variables d'état</h2>
          <button onClick={addition1} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Calculer
          </button>
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>addition2() — somme de deux paramètres</h2>
          <input type="number" placeholder="Nombre 1" value={num1} onChange={e => setNum1(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '120px' }} />
          <input type="number" placeholder="Nombre 2" value={num2} onChange={e => setNum2(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '120px' }} />
          <button onClick={addition2} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Calculer
          </button>
        </div>
        {result && (
          <div style={{ background: '#e6f1fb', border: '1px solid #1a56db', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', color: '#1a56db', fontWeight: '500' }}>
            Résultat : {result}
          </div>
        )}
        <Link to="/" style={{ color: '#1a56db', fontSize: '14px' }}>← Sommaire</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}

export default Exercice1;
