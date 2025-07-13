import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { IncomeItem, ExpenseItem } from '../types';
import { calculateMonthlyIncome, calculateMonthlyExpenses, calculateNetIncome, formatCurrency } from '../utils/calculations';

interface NetIncomeDisplayProps {
  incomeItems: IncomeItem[];
  expenseItems: ExpenseItem[];
}

const NetIncomeDisplay: React.FC<NetIncomeDisplayProps> = ({ incomeItems, expenseItems }) => {
  const monthlyIncome = calculateMonthlyIncome(incomeItems);
  const monthlyExpenses = calculateMonthlyExpenses(expenseItems);
  const netIncome = calculateNetIncome(monthlyIncome, monthlyExpenses);

  const isPositive = netIncome >= 0;
  const isNegative = netIncome < 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">每月淨收入</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-sm font-medium text-green-700">總收入</span>
          </div>
          <div className="text-xl font-bold text-green-800">
            {formatCurrency(monthlyIncome)}
          </div>
        </div>
        
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-red-600" size={20} />
            <span className="text-sm font-medium text-red-700">總支出</span>
          </div>
          <div className="text-xl font-bold text-red-800">
            {formatCurrency(monthlyExpenses)}
          </div>
        </div>
        
        <div className={`p-4 border rounded-lg ${
          isPositive 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isPositive ? (
              <TrendingUp className="text-blue-600" size={20} />
            ) : (
              <TrendingDown className="text-orange-600" size={20} />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? 'text-blue-700' : 'text-orange-700'
            }`}>
              淨收入
            </span>
          </div>
          <div className={`text-xl font-bold ${
            isPositive ? 'text-blue-800' : 'text-orange-800'
          }`}>
            {formatCurrency(Math.abs(netIncome))}
            <span className="text-sm ml-1">
              {isPositive ? '(盈餘)' : '(虧損)'}
            </span>
          </div>
        </div>
      </div>

      {isNegative && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-orange-600" size={20} />
            <span className="text-orange-800 font-medium">
              注意：您的每月支出超過收入，建議檢視支出項目或增加收入來源。
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetIncomeDisplay; 