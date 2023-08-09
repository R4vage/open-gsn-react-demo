import React, { useEffect } from 'react';
import { init, mint, transfer, getPaymasterBalance, getAlternativeBalance, getUserBalance } from './Web3Client';

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
      <button onClick={getUserBalance}>Console User's Contract Balance</button>
      <button onClick={getAlternativeBalance}>Console Alternative Account's Contract Balance</button>
    </div>
  );
}

export default App;