import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { calculateFutureValue, formatCurrency } from '../utils/calculations';

interface InvestmentCalculatorProps {
  netIncome: number;
}

const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({ netIncome }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(netIncome);
  const [annualReturnRate, setAnnualReturnRate] = useState(5);
  const [investmentYears, setInvestmentYears] = useState(10);

  const futureValue = calculateFutureValue(monthlyInvestment, annualReturnRate, investmentYears);
  const totalInvestment = monthlyInvestment * investmentYears * 12;
  const totalInterest = futureValue - totalInvestment;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Calculator className="text-blue-600" size={24} />
        投資回報計算
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            每月投資金額 (HK$)
          </label>
          <input
            type="number"
            value={monthlyInvestment || ''}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入每月投資金額"
          />
          <button
            onClick={() => setMonthlyInvestment(netIncome)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            使用淨收入 ({formatCurrency(netIncome)})
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            年化投資回報率 (%)
          </label>
          <input
            type="number"
            value={annualReturnRate || ''}
            onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入年化回報率"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            投資年期 (年)
          </label>
          <input
            type="number"
            value={investmentYears || ''}
            onChange={(e) => setInvestmentYears(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入投資年期"
          />
        </div>
      </div>

      {/* 計算結果 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-blue-800">未來收益預測</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">總投資本金</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(totalInvestment)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">總利息收益</div>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(totalInterest)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">未來總價值</div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(futureValue)}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>投資摘要：</strong>
            在 {investmentYears} 年內，每月投資 {formatCurrency(monthlyInvestment)}，
            以 {annualReturnRate}% 年化回報率計算，您將獲得 {formatCurrency(futureValue)} 的總資產。
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator; 