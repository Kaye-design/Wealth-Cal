# 財富計算器 (Wealth Calculator)

一個功能完整的財富管理應用，幫助用戶管理收支、規劃投資和設定財富目標。

## 功能特色

### 1. 收支管理
- **每月收入管理**：支持多項收入來源（工資、投資收入、其他收入等）
- **每月支出管理**：記錄各項支出（房租、生活費、貸款等）
- **動態增刪**：可隨時添加或刪除收支項目
- **頻率設定**：支持每月和一次性收支項目
- **自動計算**：實時計算每月總收入、總支出和淨收入

### 2. 投資回報計算
- **複利計算**：基於年化回報率計算未來投資收益
- **靈活設定**：可自定義每月投資金額或使用淨收入
- **詳細分析**：顯示總投資本金、利息收益和未來總價值
- **投資摘要**：提供清晰的投資計劃摘要

### 3. 財富目標反推
- **目標設定**：輸入目標財富總值和目標年期
- **反推計算**：根據投資回報率計算所需每月存款
- **詳細分析**：顯示目標財富、總存款和利息收益
- **實用建議**：提供達到財富目標的具體建議

## 技術棧

- **前端框架**：React 18 + TypeScript
- **構建工具**：Vite
- **樣式框架**：Tailwind CSS
- **圖標庫**：Lucide React
- **開發工具**：ESLint

## 安裝和運行

### 前置要求
- Node.js 16+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 構建生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 使用說明

### 收支管理
1. 在「每月收入管理」區域添加您的收入來源
2. 在「每月支出管理」區域記錄您的支出項目
3. 系統會自動計算並顯示每月淨收入
4. 如果淨收入為負數，系統會提供財務建議

### 投資規劃
1. 在「投資回報計算」區域設定投資參數
2. 可以選擇使用淨收入作為投資金額或自定義金額
3. 輸入預期的年化投資回報率和投資年期
4. 查看未來投資收益預測

### 財富目標
1. 在「財富目標反推計算」區域設定目標
2. 輸入目標財富總值、目標年期和預期回報率
3. 系統會計算出達到目標所需的每月存款金額

## 計算公式

### 複利計算公式
```
未來價值 = 每月投資 × ((1 + 月利率)^總月數 - 1) / 月利率
```

### 反推計算公式
```
每月存款 = 目標財富 / ((1 + 月利率)^總月數 - 1) / 月利率
```

其中：
- 月利率 = 年化回報率 / 100 / 12
- 總月數 = 投資年期 × 12

## 項目結構

```
src/
├── components/          # React 組件
│   ├── IncomeManager.tsx
│   ├── ExpenseManager.tsx
│   ├── NetIncomeDisplay.tsx
│   ├── InvestmentCalculator.tsx
│   └── WealthGoalCalculator.tsx
├── utils/              # 工具函數
│   └── calculations.ts
├── types.ts            # TypeScript 類型定義
├── App.tsx            # 主應用組件
├── main.tsx           # 應用入口
└── index.css          # 全局樣式
```

## 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個項目。

## 許可證

MIT License 