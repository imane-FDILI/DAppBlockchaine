import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import GestionChainesContract from '../contracts/GestionChaines.json';
import BlockchainInfo from '../components/BlockchainInfo';
function Exercice3() {
  const [state, setState] = useState({ web3: null, contract: null, account: null });
  const [chaine1, setChaine1] = useState('');
  const [chaine2, setChaine2] = useState('');
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

      const networkId = (await instanceWeb3.eth.net.getId()).toString();
      let deployedNetwork = GestionChainesContract.networks[networkId];
      if (!deployedNetwork) {
        const ids = Object.keys(GestionChainesContract.networks);
        if (ids.length === 0) {
          setResult("Erreur : le contrat n'est pas déployé. Lancez 'truffle migrate --reset'.");
          return;
        }
        deployedNetwork = GestionChainesContract.networks[ids[ids.length - 1]];
      }

      const contract = new instanceWeb3.eth.Contract(GestionChainesContract.abi, deployedNetwork.address);
      setState({ web3: instanceWeb3, contract: contract, account: accounts[0] });
    }
    initWeb3();
  }, []);

  const setMessage = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    try {
      const recu = await state.contract.methods.setMessage(chaine1).send({ from: state.account });
      setTransactions([recu, ...transactions]);
      setResult('Message enregistré : ' + chaine1);
    } catch (e) {
      setResult('Transaction annulée ou échouée : ' + (e.message || e));
    }
  };
  const getMessage = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.getMessage().call();
    setResult('Message actuel : ' + res);
  };
  const concatener = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.concatener(chaine1, chaine2).call();
    setResult('Concaténation : ' + res);
  };
  const longueur = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.longueur(chaine1).call();
    setResult('Longueur : ' + res.toString());
  };
  const comparer = async () => {
    if (!state.contract) { setResult("Contrat non chargé. Vérifiez MetaMask et le réseau Ganache."); return; }
    const res = await state.contract.methods.comparer(chaine1, chaine2).call();
    setResult(res ? 'Les deux chaînes sont IDENTIQUES' : 'Les deux chaînes sont DIFFERENTES');
  };

  return (
    <div className="exo-page">
      <header className="exo-entete">
        <span className="exo-num">Exercice 3</span>
        <h1 className="exo-titre">Traitement des chaînes de caractères</h1>
      </header>
      <div className="exo-contenu">
        <div className="exo-bloc">
          <h2 className="exo-bloc-titre">Saisie des chaînes</h2>
          <div className="exo-form">
            <input className="exo-input" placeholder="Chaîne 1" value={chaine1} onChange={e => setChaine1(e.target.value)} />
            <input className="exo-input" placeholder="Chaîne 2" value={chaine2} onChange={e => setChaine2(e.target.value)} />
          </div>
          <div className="exo-form" style={{ marginTop: '12px' }}>
            <button className="exo-btn" onClick={setMessage}>Set message (tx)</button>
            <button className="exo-btn" onClick={getMessage}>Get message</button>
            <button className="exo-btn" onClick={longueur}>Longueur</button>
            <button className="exo-btn" onClick={concatener}>Concaténer</button>
            <button className="exo-btn" onClick={comparer}>Comparer</button>
          </div>
        </div>
        {result && <div className="exo-resultat">{result}</div>}
        <Link to="/exercices" className="exo-retour">← Exercices</Link>
      </div>
      <BlockchainInfo web3={state.web3} transactions={transactions} />
    </div>
  );
}
export default Exercice3;