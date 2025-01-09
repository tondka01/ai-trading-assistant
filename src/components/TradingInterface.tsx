import React, { useState, useEffect } from 'react';

const TradingInterface = () => {
  const [marketData, setMarketData] = useState(null);
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Fetch initial market data
    fetchMarketData();
    // Set up WebSocket connection
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    
    return () => ws.close();
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/coinbase');
      const data = await response.json();
      setMarketData(data);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-4">
      {/* Price Chart */}
      <div className="w-full h-96 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">BTC-USD</h2>
        <div className="w-full h-full bg-gray-100 rounded"></div>
      </div>

      {/* Trading Panel */}
      <div className="flex gap-4">
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Place Order</h2>
          <div className="flex flex-col gap-4">
            <select 
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
            
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border rounded"
            />

            <div className="flex gap-2">
              <button className="w-1/2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                Buy
              </button>
              <button className="w-1/2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                Sell
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
          <div className="h-64 bg-gray-50 rounded p-4">
            <p className="text-gray-500">AI Assistant ready to help...</p>
          </div>
          <input
            type="text"
            placeholder="Ask AI Assistant..."
            className="w-full p-2 mt-4 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;