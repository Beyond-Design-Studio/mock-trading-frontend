export interface holdingInterface {
  stock: string;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  invested: number;
  current: number;
  pnl: number;
}

export interface fundsInterface {
  availFunds: number,
  allocFunds: number,
  profit: number,
  equity: number,
}

export const holdingsData: holdingInterface[] = [
  {
    stock: "INFY",
    purchasePrice: 900,
    currentPrice: 1200,
    quantity: 100,
    invested: 15000,
    current: 20000,
    pnl: 5000
  },
  {
    stock: "TATASTEEL",
    purchasePrice: 500,
    currentPrice: 1000,
    quantity: 100,
    invested: 35000,
    current: 70000,
    pnl: 35000
  },
  {
    stock: "WIPRO",
    purchasePrice: 1000,
    currentPrice: 700,
    quantity: 100,
    invested: 50000,
    current: 35000,
    pnl: -15000
  },
  {
    stock: "ITC",
    purchasePrice: 9000,
    currentPrice: 12000,
    quantity: 100,
    invested: 90000,
    current: 12000,
    pnl: 30000
  },
]

export const fundsData: fundsInterface = {
  availFunds: 2010900,
  allocFunds: 1012000,
  profit: 98000,
  equity: 1200000,
}
