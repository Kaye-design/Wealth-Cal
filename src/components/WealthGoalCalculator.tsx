import React, { useState } from 'react';
import { Target, Calculator } from 'lucide-react';
import { calculateRequiredMonthlySavings, formatCurrency } from '../utils/calculations';

const WealthGoalCalculator: React.FC = () => {
  const [targetWealth, setTargetWealth] = useState(1000000);
  const [targetYears, setTargetYears] = useState(10);
  const [annualReturnRate, setAnnualReturnRate] = useState(5);

  const requiredMonthlySavings = calculateRequiredMonthlySavings(
    targetWealth,
    targetYears,
    annualReturnRate
  );

  const totalSavings = requiredMonthlySavings * targetYears * 12;
  const totalInterest = targetWealth - totalSavings;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Target className="text-purple-600" size={24} />
        財富目標反推計算
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            目標財富總值 (HK$)
          </label>
          <input
            type="number"
            value={targetWealth || ''}
            onChange={(e) => setTargetWealth(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="輸入目標財富"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            目標年期 (年)
          </label>
          <input
            type="number"
            value={targetYears || ''}
            onChange={(e) => setTargetYears(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="輸入目標年期"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            年化投資回報率 (%)
          </label>
          <input
            type="number"
            value={annualReturnRate || ''}
            onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="輸入年化回報率"
            step="0.1"
          />
        </div>
      </div>

      {/* 計算結果 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-purple-800">每月存款需求</h3>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {formatCurrency(requiredMonthlySavings)}
          </div>
          <div className="text-sm text-purple-700">
            每月需要存款金額
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">目標財富</div>
            <div className="text-lg font-bold text-purple-800">
              {formatCurrency(targetWealth)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">總存款金額</div>
            <div className="text-lg font-bold text-gray-800">
              {formatCurrency(totalSavings)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">利息收益</div>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(totalInterest)}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <div className="text-sm text-purple-800">
            <strong>計算摘要：</strong>
            要在 {targetYears} 年內達到 {formatCurrency(targetWealth)} 的財富目標，
            以 {annualReturnRate}% 年化回報率計算，您需要每月存款 {formatCurrency(requiredMonthlySavings)}。
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthGoalCalculator; 