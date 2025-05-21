export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: string;
  month: string;
  year: string;
  amount: number;
  category: string;
  payee: string;
  description: string;
  note: string;
}

export interface DashboardData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];
  expensesByCategory: {
    category: string;
    amount: number;
  }[];
}