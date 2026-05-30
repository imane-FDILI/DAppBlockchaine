import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import GestionChainesContract from '../contracts/GestionChaines.json';
import BlockchainInfo from '../components/BlockchainInfo';
function Exercice3() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [message, setMessage] = useState('');
  const [chaine1, setChaine1] = useState('');
  const [chaine2, setChaine2] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');
    async function initWeb3() {
      const instanceWeb3 = new Web3(provider);
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = GestionChainesContract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(GestionChainesContract.abi, deployedNetwork.address);
      const accounts = await instanceWeb3.eth.getAccounts();
      setAccount(accounts[0]);
      setState({ web3: instanceWeb3, contract: contract });
    }
    provider && initWeb3();
  }, []);

  const setMsg = async () => {
    const { contract } = state;
    await contract.methods.setMessage(chaine1).send({ from: account });
    setResult('Message défini : ' + chaine1);
  };

  const getMsg = async () => {
    const { contract } = state;
    const res = await contract.methods.getMessage().call();
    setResult('Message : ' + res);
  };

  const concatener = async () => {
    const { contract } = state;
    const res = await contract.methods.concatener(chaine1, chaine2).call();
    setResult('Concaténation : ' + res);
  };

  const longueur = async () => {
    const { contract } = state;
    const res = await contract.methods.longueur(chaine1).call();
    setResult('Longueur de "' + chaine1 + '" : ' + res);
  };

  const comparer = async () => {
    const { contract } = state;
    const res = await contract.methods.comparer(chaine1, chaine2).call();
    setResult('Les deux chaînes sont ' + (res ? 'IDENTIQUES' : 'DIFFÉRENTES'));
  };

  return (
    <div>
      <div style={{ background: '#1a56db', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px' }}>Exercice 3 : Traitement des chaînes de caractères</h1>
      </div>
      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Chaînes de caractères</h2>
          <input type="text" placeholder="Chaîne 1" value={chaine1} onChange={e => setChaine1(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '180px' }} />
          <input type="text" placeholder="Chaîne 2" value={chaine2} onChange={e => setChaine2(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', width: '180px' }} />
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[['Set Message', setMsg], ['Get Message', getMsg], ['Concaténer', concatener], ['Longueur', longueur], ['Comparer', comparer]].map(([label, fn]) => (
            <button key={label} onClick={fn} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              {label}
            </button>
          ))}
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

export default Exercice3;