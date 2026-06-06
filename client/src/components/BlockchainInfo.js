import React, { useState, useEffect } from 'react';

function BlockchainInfo({ web3, transactions }) {
  const [blockInfo, setBlockInfo] = useState(null);
  const [account, setAccount] = useState('');
  const [networkInfo, setNetworkInfo] = useState(null);

  useEffect(() => {
    if (!web3) return;
    async function fetchInfo() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const blockNumber = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(blockNumber);
      const networkId = await web3.eth.net.getId();
      setNetworkInfo({ url: 'http://127.0.0.1:7545', id: networkId.toString() });
      setBlockInfo(block);
    }
    fetchInfo();
  }, [web3]);

  const style = {
    container: { background: '#1a56db', color: 'white', padding: '1.5rem', marginTop: '2rem' },
    title: { textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '1.5rem' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    card: { background: 'white', color: '#333', borderRadius: '8px', padding: '1rem' },
    cardTitle: { color: '#1a56db', fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '14px' },
    row: { fontSize: '12px', marginBottom: '6px', wordBreak: 'break-all' },
    label: { fontWeight: 'bold' },
  };

  return (
    <div style={style.container}>
      <div style={style.title}>Informations de la Blockchain</div>
      <div style={style.grid}>

        {/* Blockchain Info */}
        <div style={style.card}>
          <div style={style.cardTitle}>Blockchain</div>
          {networkInfo && (
            <>
              <div style={style.row}><span style={style.label}>Infos du réseau :</span></div>
              <div style={style.row}><span style={style.label}>URL : </span>{networkInfo.url}</div>
              <div style={style.row}><span style={style.label}>ID : </span>{networkInfo.id}</div>
              <div style={style.row}><span style={style.label}>Compte : </span>{account}</div>
            </>
          )}
          {blockInfo && (
            <>
              <div style={{ ...style.row, marginTop: '0.75rem' }}><span style={style.label}>Infos du dernier bloc :</span></div>
              <div style={style.row}><span style={style.label}>N° : </span>#{blockInfo.number?.toString()}</div>
              <div style={style.row}><span style={style.label}>Hash : </span>{blockInfo.hash}</div>
              <div style={style.row}><span style={style.label}>Timestamp : </span>{new Date(Number(blockInfo.timestamp) * 1000).toLocaleString()}</div>
              <div style={style.row}><span style={style.label}>gasLimit : </span>{blockInfo.gasLimit?.toString()}</div>
              <div style={style.row}><span style={style.label}>gasUsed : </span>{blockInfo.gasUsed?.toString()}</div>
            </>
          )}
        </div>

        {/* Transactions Info */}
        <div style={style.card}>
          <div style={style.cardTitle}>Transactions ({transactions ? transactions.length : 0})</div>
          {transactions && transactions.length > 0 ? (
            transactions.map((tx, i) => (
              <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <div style={style.row}><span style={style.label}>Transaction #{i + 1}</span></div>
                <div style={style.row}><span style={style.label}>Hash : </span>{tx.transactionHash}</div>
                <div style={style.row}><span style={style.label}>Gas utilisé : </span>{tx.gasUsed?.toString()}</div>
                <div style={style.row}><span style={style.label}>Bloc : </span>{tx.blockNumber?.toString()}</div>
                <div style={style.row}><span style={style.label}>Statut : </span>{tx.status ? ' Succès' : ' Reject'}</div>
              </div>
            ))
          ) : (
            <div style={style.row}>Aucune transaction pour le moment</div>
          )}
        </div>

      </div>
    </div>
  );
}

export default BlockchainInfo;