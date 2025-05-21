import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Transaction, TransactionType } from '../types';

const PAYEE_OPTIONS = ['Mom', 'Jay', 'Jaimin', 'Mansi'];

const TransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    month: new Date().toLocaleString('default', { month: 'short' }) + '-' + new Date().getFullYear().toString().slice(2),
    year: new Date().getFullYear().toString(),
    amount: 0,
    category: '',
    payee: '',
    description: '',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else if (name === 'date') {
      const date = new Date(value);
      const month = date.toLocaleString('default', { month: 'short' }) + '-' + date.getFullYear().toString().slice(2);
      const year = date.getFullYear().toString();
      
      setFormData({
        ...formData,
        date: value,
        month,
        year
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleTypeChange = (type: TransactionType) => {
    setFormData({ ...formData, type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    addTransaction(formData);
    
    const modalCheckbox = document.getElementById('transaction-modal') as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }
    
    setFormData({
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      month: new Date().toLocaleString('default', { month: 'short' }) + '-' + new Date().getFullYear().toString().slice(2),
      year: new Date().getFullYear().toString(),
      amount: 0,
      category: '',
      payee: '',
      description: '',
      note: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          className={`flex-1 py-2 rounded-md ${
            formData.type === 'expense' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTypeChange('expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={`flex-1 py-2 rounded-md ${
            formData.type === 'income' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTypeChange('income')}
        >
          Income
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="e.g., Groceries, Salary, etc."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {formData.type === 'expense' ? 'Payee' : 'Payer'}
        </label>
        <select
          name="payee"
          value={formData.payee}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select {formData.type === 'expense' ? 'Payee' : 'Payer'}</option>
          {PAYEE_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Brief description"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={2}
          placeholder="Additional notes (optional)"
        />
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
          Save Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;