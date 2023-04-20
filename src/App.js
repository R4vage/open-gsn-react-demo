import React, { useEffect } from 'react';
import { init, mint, transfer, getPaymasterBalance } from './Web3Client';

function App() {
  useEffect(() => {
    init();
  }, []);

  const handleMint = () => {
    mint(100);
  };

  const handleTransfer = () => {
    transfer(100);
  }



  return (
    <div className='App'>
      <button onClick={handleMint}>Mint Tokens</button>
      <button onClick={handleTransfer}>Transfer 100 Tokens</button>
      <button onClick={getPaymasterBalance}>Console Paymaster Balance</button>
    </div>
  );
}

export default App;