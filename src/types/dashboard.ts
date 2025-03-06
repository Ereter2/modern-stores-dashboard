
export type StoreStats = {
  totalProducts: number;
  totalProductsChange: number;
  totalSales: number;
  totalSalesChange: number;
  avgMargin: number;
  avgMarginChange: number;
  outOfStock: number;
  outOfStockLabel: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  storeA: {
    price: number;
    stock: number;
    status: "in-stock" | "out-of-stock" | "low-stock";
  };
  storeB: {
    price: number;
    stock: number;
    status: "in-stock" | "out-of-stock" | "low-stock";
  };
  storeC: {
    price: number;
    stock: number;
    status: "in-stock" | "out-of-stock" | "low-stock";
  };
  margin: number;
};

export type SalesData = {
  day: string;
  storeA: number;
  storeB: number;
  storeC: number;
};

export type StockDistribution = {
  name: string;
  value: number;
  color: string;
};

export type StoreFilter = "all" | "storeA" | "storeB" | "storeC";
export type SortOption = "best-selling" | "price-high" | "price-low" | "margin";
export type StatusFilter = "all" | "in-stock" | "out-of-stock" | "low-stock";
export type TimeRange = "7days" | "30days" | "90days" | "year";
export type CategoryFilter = "all" | "electronics" | "clothing" | "food" | "home";
