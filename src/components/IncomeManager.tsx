import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { IncomeItem } from '../types';
import { calculateMonthlyIncome, formatCurrency } from '../utils/calculations';

interface IncomeManagerProps {
  incomeItems: IncomeItem[];
  onIncomeItemsChange: (items: IncomeItem[]) => void;
}

const IncomeManager: React.FC<IncomeManagerProps> = ({ incomeItems, onIncomeItemsChange }) => {
  const [newItem, setNewItem] = useState<Omit<IncomeItem, 'id'>>({
    name: '',
    amount: 0,
    frequency: 'monthly'
  });

  const addIncomeItem = () => {
    if (newItem.name.trim() && newItem.amount > 0) {
      const newIncomeItem: IncomeItem = {
        ...newItem,
        id: Date.now().toString()
      };
      onIncomeItemsChange([...incomeItems, newIncomeItem]);
      setNewItem({ name: '', amount: 0, frequency: 'monthly' });
    }
  };

  const removeIncomeItem = (id: string) => {
    onIncomeItemsChange(incomeItems.filter(item => item.id !== id));
  };

  const updateIncomeItem = (id: string, field: keyof IncomeItem, value: string | number) => {
    onIncomeItemsChange(incomeItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalMonthlyIncome = calculateMonthlyIncome(incomeItems);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">每月收入管理</h2>
      
      {/* 新增收入項目 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="收入項目名稱"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="金額 (HK$)"
          value={newItem.amount || ''}
          onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={newItem.frequency}
          onChange={(e) => setNewItem({ ...newItem, frequency: e.target.value as 'monthly' | 'one-time' })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="monthly">每月</option>
          <option value="one-time">一次性</option>
        </select>
        <button
          onClick={addIncomeItem}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          新增
        </button>
      </div>

      {/* 收入項目列表 */}
      <div className="space-y-3">
        {incomeItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateIncomeItem(item.id, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={item.amount || ''}
              onChange={(e) => updateIncomeItem(item.id, 'amount', Number(e.target.value))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={item.frequency}
              onChange={(e) => updateIncomeItem(item.id, 'frequency', e.target.value as 'monthly' | 'one-time')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">每月</option>
              <option value="one-time">一次性</option>
            </select>
            <button
              onClick={() => removeIncomeItem(item.id)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* 總收入顯示 */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-lg font-semibold text-green-800">
          每月總收入: {formatCurrency(totalMonthlyIncome)}
        </div>
      </div>
    </div>
  );
};

export default IncomeManager; 