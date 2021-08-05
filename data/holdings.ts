interface holding {
  stock: string;
  purchasePrice: number;
  currentPrice: number;
  invested: number;
  current: number;
  pnl: number;
}


const holdingsData:holding[] = [
  {
    stock: "INFY",
    purchasePrice: 900,
    currentPrice: 1200,
    invested: 15000,
    current: 20000,
    pnl: 5000
  },
  {
    stock: "TATASTEEL",
    purchasePrice: 500,
    currentPrice: 1000,
    invested: 35000,
    current: 70000,
    pnl: 35000
  },
  {
    stock: "WIPRO",
    purchasePrice: 1000,
    currentPrice: 700,
    invested: 50000,
    current: 35000,
    pnl: -15000
  },
  {
    stock: "ITC",
    purchasePrice: 9000,
    currentPrice: 12000,
    invested: 90000,
    current: 12000,
    pnl: 30000
  },
  

]
export default holdingsData;