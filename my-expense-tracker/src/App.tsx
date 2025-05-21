import React from 'react';
import { PlusCircle } from 'lucide-react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Transactions</h2>
              <label htmlFor="transaction-modal" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                <PlusCircle size={18} className="mr-2" />
                Add Transaction
              </label>
            </div>
            <TransactionList />
          </div>
        </main>
        
        {/* Modal */}
        <input type="checkbox" id="transaction-modal" className="modal-toggle hidden" />
        <div className="modal">
          <div className="modal-box bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Transaction</h3>
              <label htmlFor="transaction-modal" className="btn btn-sm btn-circle text-gray-500 hover:text-gray-700 cursor-pointer">✕</label>
            </div>
            <TransactionForm />
          </div>
          <label htmlFor="transaction-modal" className="modal-backdrop"></label>
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;