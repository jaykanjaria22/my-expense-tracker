import React, { useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { transactions } = useTransactions();
  
  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center">
            <ArrowUpCircle className="text-green-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Income</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(summary.income)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center">
            <ArrowDownCircle className="text-red-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Expenses</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(summary.expenses)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <DollarSign className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className={`text-xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summary.balance)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;