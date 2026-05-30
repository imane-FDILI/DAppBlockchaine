import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import RectangleContract from '../contracts/Rectangle.json';
import BlockchainInfo from '../components/BlockchainInfo';
function Exercice7() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [dx, setDx] = useState('');
  const [dy, setDy] = useState('');
  const [result, setResult] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');
    async function initWeb3() {
      const instanceWeb3 = new Web3(provider);
      const networkId = await instanceWeb3.eth.net.getId();
      const deployedNetwork = RectangleContract.networks[networkId];
      const contract = new instanceWeb3.eth.Contract(RectangleContract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract });
    }
    provider && initWeb3();
  }, []);

  const afficheInfos = async () => {
    const { contract } = state;
    const res = await contract.methods.afficheInfos().call();
    setResult(res);
  };

  const surface = async () => {
    const { contract } = state;
    const res = await contract.methods.surface().call();
    setResult('Surface = ' + res);
  };

  const afficheXY = async () => {
    const { contract } = state;
    const res = await contract.methods.afficheXY().call();
    setResult('x = ' + res[0] + ', y = ' + res[1]);
  };

  const afficheLoLa = async () => {
    const { contract } = state;
    const res = await contract.methods.afficheLoLa().call();
    setResult('Longueur = ' + res[0] + ', Largeur = ' + res[1]);
  };

  const deplacerForme = async () => {
    const { contract } = state;
    const accounts = await state.web3.eth.getAccounts();
    await contract.methods.deplacerForme(dx, dy).send({ from: accounts[0] });
    setResult('Forme déplacée de dx=' + dx + ' dy=' + dy);
  };

  return (
    <div>
      <div style={{ background: '#1a56db', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px' }}>Exercice 7 : Programmation Orientée Objet (Formes géométriques)</h1>
      </div>
      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={afficheInfos} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>Affiche Infos</button>
          <button onClick={surface} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>Surface</button>
          <button onClick={afficheXY} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>Affiche XY</button>
          <button onClick={afficheLoLa} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>Affiche Lo/La</button>
        </div>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Déplacer la forme</h2>
          <input type="number" min="0" placeholder="dx" value={dx} onChange={e => setDx(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '100px' }} />
          <input type="number" min="0" placeholder="dy" value={dy} onChange={e => setDy(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', marginRight: '10px', width: '100px' }} />
          <button onClick={deplacerForme} style={{ background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}>
            Déplacer
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

export default Exercice7;