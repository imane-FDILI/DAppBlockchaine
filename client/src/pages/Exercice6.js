import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Exercice6Contract from '../contracts/Exercice6.json';
import BlockchainInfo from '../components/BlockchainInfo';
function Exercice6() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [nombre, setNombre] = useState('');
  const [index, setIndex] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');
    async function initWeb3() {
      const instanceWeb3 = new Web3(provider);
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = Exercice6Contract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(Exercice6Contract.abi, deployedNetwork.address);
      const accounts = await instanceWeb3.eth.getAccounts();
      setAccount(accounts[0]);
      setState({ web3: instanceWeb3, contract: contract });
    }
    provider && initWeb3();
  }, []);

  const ajouterNombre = async () => {
    const { contract } = state;
    await contract.methods.ajouterNombre(nombre).send({ from: account });
    setResult('Nombre ' + nombre + ' ajouté ✅');
  };

  const getElement = async () => {
    const { contract } = state;
    const res = await contract.methods.getElement(index).call();
    setResult('Element[' + index + '] = ' + res);
  };

  const afficheTableau = async () => {
    const { contract } = state;
    const res = await contract.methods.afficheTableau().call();
    setResult('Tableau : [' + res.join(', ') + ']');
  };

  const calculerSomme = async () => {
    const { contract } = state;
    const res = await contract.methods.calculerSomme().call();
    setResult('Somme = ' + res);
  };

  return (
    <div>
      <div style={{ background: '#1a56db', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px' }}>Exercice 6 : Gestion des tableaux</h1>
      </div>
      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Ajouter un nombre</h2>
          <input type="number" min="0" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '150px' }} />
          <button onClick={ajouterNombre} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Ajouter
          </button>
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Accéder à un élément</h2>
          <input type="number" min="0" placeholder="Index" value={index} onChange={e => setIndex(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '150px' }} />
          <button onClick={getElement} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Get Element
          </button>
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', gap: '10px' }}>
          <button onClick={afficheTableau} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Afficher Tableau
          </button>
          <button onClick={calculerSomme} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Calculer Somme
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

export default Exercice6;