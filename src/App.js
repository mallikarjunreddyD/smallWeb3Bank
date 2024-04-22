import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

function App() {
    const [page, setPage] = useState('');
    const [lendAmount, setLendAmount] = useState(1);
    const [borrowAmount, setBorrowAmount] = useState(1);
    const [paybackAmount, setPaybackAmount] = useState(1);
    const [id,setID] = useState(0);

    const renderPage = () => {
        switch (page) {
            case 'lend':
              return (
                <div>
                  <h2>Lend</h2>
                  <input type="text" placeholder="Enter amount to lend" onChange={(e)=>setLendAmount(e.target.value)} />
                  <button onClick={handleLend}>Lend</button>
                </div>
              );
            case 'borrow':
              return (
                <div>
                  <h2>Borrow</h2>
                  <input type="text" placeholder="Enter amount to borrow" onChange={(e)=>setBorrowAmount(e.target.value)}/>
                  <button onClick={handleBorrow}>Borrow</button>
                </div>
              );
            case 'withdraw':
              return (
                <div>
                  <h2>Withdraw</h2>
                  <input type="text" placeholder="Enter FD ID" onChange={(e)=>setID(e.target.value)}/>
                  <button onClick={handleWithdraw}>Withdraw</button>
                </div>
              );
            case 'payback':
              return (
                <div>
                  <h2>Payback</h2>
                  <input type="text" placeholder="Enter Loan ID" onChange={(e)=>setID(e.target.value)} />
                  <input type="text" placeholder="Enter amount to pay back" onChange={(e)=>setPaybackAmount(e.target.value)}/>
                  <button onClick={handlePayback}>Payback</button>
                </div>
              );
            default:
              return null;
          }
    }
    const handleLend = () => {
        // Call lend function
        console.log('Lend function called', lendAmount);
        alert('Lending success');
      };
    
      const handleBorrow = () => {
        // Call borrow function
        console.log('Borrow function called',borrowAmount);
        alert('Borrowing success');
      };
    
      const handleWithdraw = () => {
        // Call withdraw function
        console.log('Withdraw function called', id);
        alert('Withdraw success');
      };
    
      const handlePayback = () => {
        // Call payback function
        console.log('Payback function called', id, paybackAmount);
        alert('Payback success');
      };
    
    return(
        <div className="App">
        <div className="navbar li.active">
          <button onClick={() => setPage('lend')}>Lend</button>
          <button onClick={() => setPage('borrow')}>Borrow</button>
          <button onClick={() => setPage('withdraw')}>Withdraw</button>
          <button onClick={() => setPage('payback')}>Payback</button>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
    )
}

export default App;