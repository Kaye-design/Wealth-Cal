import { IncomeItem, ExpenseItem, InvestmentCalculation, WealthGoalCalculation } from '../types';

// 計算每月總收入
export const calculateMonthlyIncome = (incomeItems: IncomeItem[]): number => {
  return incomeItems.reduce((total, item) => {
    if (item.frequency === 'monthly') {
      return total + item.amount;
    } else {
      // 一次性收入按12個月平均
      return total + (item.amount / 12);
    }
  }, 0);
};

// 計算每月總支出
export const calculateMonthlyExpenses = (expenseItems: ExpenseItem[]): number => {
  return expenseItems.reduce((total, item) => {
    if (item.frequency === 'monthly') {
      return total + item.amount;
    } else {
      // 一次性支出按12個月平均
      return total + (item.amount / 12);
    }
  }, 0);
};

// 計算每月淨收入
export const calculateNetIncome = (monthlyIncome: number, monthlyExpenses: number): number => {
  return monthlyIncome - monthlyExpenses;
};

// 計算未來投資收益（複利計算）
export const calculateFutureValue = (
  monthlyInvestment: number,
  annualReturnRate: number,
  investmentYears: number
): number => {
  const monthlyRate = annualReturnRate / 100 / 12;
  const totalMonths = investmentYears * 12;
  
  // 使用複利公式計算未來價值
  const futureValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  
  return futureValue;
};

// 計算達到財富目標所需的每月存款
export const calculateRequiredMonthlySavings = (
  targetWealth: number,
  targetYears: number,
  annualReturnRate: number
): number => {
  const monthlyRate = annualReturnRate / 100 / 12;
  const totalMonths = targetYears * 12;
  
  // 使用複利公式反推每月存款
  const requiredSavings = targetWealth / 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  
  return requiredSavings;
};

// 格式化貨幣顯示
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-HK', {
    style: 'currency',
    currency: 'HKD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}; 