import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

import CurrentBalanceCard from '../common/transaction/CurrentBalanceCard';
import PaymentMethodsCard from '../common/transaction/PaymentMethodsCard';
import PayAnalysisCard from '../common/transaction/PayAnalysisCard';
import BalanceBreakdownCard from '../common/transaction/BalanceBreakdownCard';
import PaymentHistoryTable from '../common/transaction/PaymentHistoryTable';

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/transactions/getTransactionData.php`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setTransactionData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch transaction data.');
        }
      } catch (err) {
        setError('An error occurred while fetching transactions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  if (loading) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Transaction</h1>
            <div className="text-center">Loading transaction data...</div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Transaction</h1>
            <div className="p-4 text-center text-red-600 bg-red-100 dark:bg-red-900/50 rounded-lg">{error}</div>
        </div>
    );
  }

  if (!transactionData) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Transaction</h1>
            <div className="text-center">No transaction data available.</div>
        </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Transaction
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CurrentBalanceCard balance={transactionData.currentBalance} />
        </div>
        
        <div className="lg:col-span-1">
          <PaymentMethodsCard />
        </div>

        <div className="lg:col-span-1">
          <PayAnalysisCard data={transactionData.payAnalysis} />
        </div>

        <div className="lg:col-span-2">
        <BalanceBreakdownCard breakdownData={transactionData.balanceBreakdown} />
        </div>

        <div className="lg:col-span-3">
          <PaymentHistoryTable history={transactionData.paymentHistory} />
        </div>
      </div>
    </>
  );
};

export default TransactionPage;

