import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ExpenseItem } from '../types';
import { calculateMonthlyExpenses, formatCurrency } from '../utils/calculations';

interface ExpenseManagerProps {
  expenseItems: ExpenseItem[];
  onExpenseItemsChange: (items: ExpenseItem[]) => void;
}

const ExpenseManager: React.FC<ExpenseManagerProps> = ({ expenseItems, onExpenseItemsChange }) => {
  const [newItem, setNewItem] = useState<Omit<ExpenseItem, 'id'>>({
    name: '',
    amount: 0,
    frequency: 'monthly'
  });

  const addExpenseItem = () => {
    if (newItem.name.trim() && newItem.amount > 0) {
      const newExpenseItem: ExpenseItem = {
        ...newItem,
        id: Date.now().toString()
      };
      onExpenseItemsChange([...expenseItems, newExpenseItem]);
      setNewItem({ name: '', amount: 0, frequency: 'monthly' });
    }
  };

  const removeExpenseItem = (id: string) => {
    onExpenseItemsChange(expenseItems.filter(item => item.id !== id));
  };

  const updateExpenseItem = (id: string, field: keyof ExpenseItem, value: string | number) => {
    onExpenseItemsChange(expenseItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalMonthlyExpenses = calculateMonthlyExpenses(expenseItems);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">每月支出管理</h2>
      
      {/* 新增支出項目 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="支出項目名稱"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="number"
          placeholder="金額 (HK$)"
          value={newItem.amount || ''}
          onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={newItem.frequency}
          onChange={(e) => setNewItem({ ...newItem, frequency: e.target.value as 'monthly' | 'one-time' })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="monthly">每月</option>
          <option value="one-time">一次性</option>
        </select>
        <button
          onClick={addExpenseItem}
          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus size={20} />
          新增
        </button>
      </div>

      {/* 支出項目列表 */}
      <div className="space-y-3">
        {expenseItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateExpenseItem(item.id, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="number"
              value={item.amount || ''}
              onChange={(e) => updateExpenseItem(item.id, 'amount', Number(e.target.value))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              value={item.frequency}
              onChange={(e) => updateExpenseItem(item.id, 'frequency', e.target.value as 'monthly' | 'one-time')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="monthly">每月</option>
              <option value="one-time">一次性</option>
            </select>
            <button
              onClick={() => removeExpenseItem(item.id)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* 總支出顯示 */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-lg font-semibold text-red-800">
          每月總支出: {formatCurrency(totalMonthlyExpenses)}
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager; 