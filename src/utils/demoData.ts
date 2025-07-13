import { IncomeItem, ExpenseItem } from '../types';

// 演示收入數據
export const demoIncomeItems: IncomeItem[] = [
  {
    id: '1',
    name: '基本工資',
    amount: 25000,
    frequency: 'monthly'
  },
  {
    id: '2',
    name: '投資收入',
    amount: 3000,
    frequency: 'monthly'
  },
  {
    id: '3',
    name: '年終獎金',
    amount: 60000,
    frequency: 'one-time'
  }
];

// 演示支出數據
export const demoExpenseItems: ExpenseItem[] = [
  {
    id: '1',
    name: '房租',
    amount: 8000,
    frequency: 'monthly'
  },
  {
    id: '2',
    name: '生活費用',
    amount: 5000,
    frequency: 'monthly'
  },
  {
    id: '3',
    name: '交通費',
    amount: 1000,
    frequency: 'monthly'
  },
  {
    id: '4',
    name: '娛樂支出',
    amount: 2000,
    frequency: 'monthly'
  },
  {
    id: '5',
    name: '保險費',
    amount: 12000,
    frequency: 'one-time'
  }
]; 