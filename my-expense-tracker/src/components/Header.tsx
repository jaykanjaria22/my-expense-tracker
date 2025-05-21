import React from 'react';
import { BarChart4 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <BarChart4 className="text-green-600 mr-2" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Finance Tracker</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;