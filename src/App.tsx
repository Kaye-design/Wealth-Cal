import React, { useState } from 'react';
import { DollarSign, TrendingUp, Target, Calculator, Play } from 'lucide-react';
import { IncomeItem, ExpenseItem } from './types';
import { calculateMonthlyIncome, calculateMonthlyExpenses, calculateNetIncome } from './utils/calculations';
import { demoIncomeItems, demoExpenseItems } from './utils/demoData';
import IncomeManager from './components/IncomeManager';
import ExpenseManager from './components/ExpenseManager';
import NetIncomeDisplay from './components/NetIncomeDisplay';
import InvestmentCalculator from './components/InvestmentCalculator';
import WealthGoalCalculator from './components/WealthGoalCalculator';

const App: React.FC = () => {
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);

  const monthlyIncome = calculateMonthlyIncome(incomeItems);
  const monthlyExpenses = calculateMonthlyExpenses(expenseItems);
  const netIncome = calculateNetIncome(monthlyIncome, monthlyExpenses);

  const loadDemoData = () => {
    setIncomeItems(demoIncomeItems);
    setExpenseItems(demoExpenseItems);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <DollarSign className="text-green-600" size={40} />
            財富計算器
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            管理您的收支，規劃您的財富未來
          </p>
          <button
            onClick={loadDemoData}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play size={20} />
            載入演示數據
          </button>
        </div>

        {/* 收支管理區域 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={28} />
            收支管理
          </h2>
          
          <IncomeManager 
            incomeItems={incomeItems}
            onIncomeItemsChange={setIncomeItems}
          />
          
          <ExpenseManager 
            expenseItems={expenseItems}
            onExpenseItemsChange={setExpenseItems}
          />
          
          <NetIncomeDisplay 
            incomeItems={incomeItems}
            expenseItems={expenseItems}
          />
        </div>

        {/* 投資計算區域 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calculator className="text-purple-600" size={28} />
            投資規劃
          </h2>
          
          <InvestmentCalculator netIncome={netIncome} />
        </div>

        {/* 財富目標區域 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="text-orange-600" size={28} />
            財富目標
          </h2>
          
          <WealthGoalCalculator />
        </div>

        {/* 使用說明 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">使用說明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">收支管理</h4>
              <ul className="space-y-1">
                <li>• 添加您的每月收入來源（工資、投資收入等）</li>
                <li>• 記錄您的每月支出項目（房租、生活費等）</li>
                <li>• 系統自動計算每月淨收入</li>
                <li>• 支持一次性收入和支出的平均分配</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">投資規劃</h4>
              <ul className="space-y-1">
                <li>• 設定每月投資金額和投資年期</li>
                <li>• 輸入預期年化回報率</li>
                <li>• 查看未來投資收益預測</li>
                <li>• 反推達到財富目標所需的每月存款</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 