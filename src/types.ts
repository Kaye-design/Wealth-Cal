export interface IncomeItem {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'one-time';
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'one-time';
}

export interface InvestmentCalculation {
  monthlyInvestment: number;
  annualReturnRate: number;
  investmentYears: number;
  futureValue: number;
}

export interface WealthGoalCalculation {
  targetWealth: number;
  targetYears: number;
  annualReturnRate: number;
  requiredMonthlySavings: number;
} 