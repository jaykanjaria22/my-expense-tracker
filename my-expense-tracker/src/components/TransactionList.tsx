import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Transaction, TransactionType } from '../types';
import { ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-react';

const PAYEE_OPTIONS = ['Mom', 'Jay', 'Jaimin', 'Mansi'];

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedPayee, setSelectedPayee] = useState<string>('all');
  
  const uniqueMonths = [...new Set(transactions.map(t => t.month))].sort();
  
  const filteredTransactions = transactions
    .filter(t => filter === 'all' ? true : t.type === filter)
    .filter(t => selectedMonth === 'all' ? true : t.month === selectedMonth)
    .filter(t => selectedPayee === 'all' ? true : t.payee === selectedPayee);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const calculateTotals = (transactions: Transaction[]) => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    return {
      income: formatCurrency(income),
      expense: formatCurrency(expense),
      balance: formatCurrency(balance)
    };
  };

  const totals = calculateTotals(filteredTransactions);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm ${
              filter === 'all' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-4 py-2 rounded-md text-sm ${
              filter === 'income' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-4 py-2 rounded-md text-sm ${
              filter === 'expense' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Expenses
          </button>
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 border border-gray-300"
          >
            <option value="all">All Months</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <select
            value={selectedPayee}
            onChange={(e) => setSelectedPayee(e.target.value)}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 border border-gray-300"
          >
            <option value="all">All Payees/Payers</option>
            {PAYEE_OPTIONS.map(payee => (
              <option key={payee} value={payee}>{payee}</option>
            ))}
          </select>
        </div>

        <div className="text-right space-x-4">
          <span>
            <span className="font-semibold">Income: </span>
            <span className="text-green-600">{totals.income}</span>
          </span>
          <span>
            <span className="font-semibold">Expense: </span>
            <span className="text-red-600">{totals.expense}</span>
          </span>
          <span>
            <span className="font-semibold">Balance: </span>
            <span className={totals.balance.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
              {totals.balance}
            </span>
          </span>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No transactions found. Add a new transaction to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payee/Payer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle className="text-green-500" size={20} />
                    ) : (
                      <ArrowDownCircle className="text-red-500" size={20} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.payee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;