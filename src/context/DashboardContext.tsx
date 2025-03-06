
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  StoreStats,
  Product,
  SalesData,
  StockDistribution,
  StoreFilter,
  SortOption,
  StatusFilter,
  TimeRange,
  CategoryFilter,
} from "@/types/dashboard";

// Mock data for our dashboard
const mockStoreStats: StoreStats = {
  totalProducts: 90,
  totalProductsChange: 12,
  totalSales: 24590,
  totalSalesChange: 8,
  avgMargin: 32,
  avgMarginChange: -2,
  outOfStock: 12,
  outOfStockLabel: "items",
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    sku: "12345",
    storeA: { price: 99.99, stock: 24, status: "in-stock" },
    storeB: { price: 89.99, stock: 12, status: "in-stock" },
    storeC: { price: 94.99, stock: 0, status: "out-of-stock" },
    margin: 28,
  },
  {
    id: "2",
    name: "Wireless Mouse",
    sku: "23456",
    storeA: { price: 45.99, stock: 32, status: "in-stock" },
    storeB: { price: 42.99, stock: 8, status: "low-stock" },
    storeC: { price: 46.99, stock: 15, status: "in-stock" },
    margin: 35,
  },
  {
    id: "3",
    name: "Smart Watch",
    sku: "34567",
    storeA: { price: 199.99, stock: 0, status: "out-of-stock" },
    storeB: { price: 189.99, stock: 5, status: "low-stock" },
    storeC: { price: 195.99, stock: 0, status: "out-of-stock" },
    margin: 42,
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    sku: "45678",
    storeA: { price: 79.99, stock: 18, status: "in-stock" },
    storeB: { price: 74.99, stock: 20, status: "in-stock" },
    storeC: { price: 77.99, stock: 12, status: "in-stock" },
    margin: 31,
  },
];

const mockSalesData: SalesData[] = [
  { day: "Monday", storeA: 1200, storeB: 900, storeC: 700 },
  { day: "Tuesday", storeA: 1300, storeB: 850, storeC: 900 },
  { day: "Wednesday", storeA: 1400, storeB: 1000, storeC: 850 },
  { day: "Thursday", storeA: 1500, storeB: 1200, storeC: 950 },
  { day: "Friday", storeA: 1800, storeB: 1400, storeC: 1200 },
  { day: "Saturday", storeA: 2100, storeB: 1700, storeC: 1500 },
  { day: "Sunday", storeA: 1700, storeB: 1300, storeC: 1100 },
];

const mockStockDistribution: StockDistribution[] = [
  { name: "Electronics", value: 40, color: "#9b87f5" },
  { name: "Clothing", value: 25, color: "#7E69AB" },
  { name: "Food", value: 15, color: "#6E59A5" },
  { name: "Home", value: 20, color: "#a075f7" },
];

interface DashboardContextProps {
  stats: StoreStats;
  products: Product[];
  salesData: SalesData[];
  stockDistribution: StockDistribution[];
  storeFilter: StoreFilter;
  setStoreFilter: (filter: StoreFilter) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (filter: StatusFilter) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeFilter, setStoreFilter] = useState<StoreFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("7days");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // In a real app, these would be derived from API calls, etc.
  const stats = mockStoreStats;
  const products = mockProducts;
  const salesData = mockSalesData;
  const stockDistribution = mockStockDistribution;
  const totalPages = Math.ceil(products.length / 10);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        products,
        salesData,
        stockDistribution,
        storeFilter,
        setStoreFilter,
        sortOption,
        setSortOption,
        statusFilter,
        setStatusFilter,
        timeRange,
        setTimeRange,
        categoryFilter,
        setCategoryFilter,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
