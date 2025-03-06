import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
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
  {
    id: "5",
    name: "Laptop Pro",
    sku: "56789",
    storeA: { price: 1299.99, stock: 10, status: "in-stock" },
    storeB: { price: 1249.99, stock: 5, status: "low-stock" },
    storeC: { price: 1279.99, stock: 0, status: "out-of-stock" },
    margin: 25,
  },
  {
    id: "6",
    name: "Desk Lamp",
    sku: "67890",
    storeA: { price: 49.99, stock: 30, status: "in-stock" },
    storeB: { price: 45.99, stock: 25, status: "in-stock" },
    storeC: { price: 47.99, stock: 18, status: "in-stock" },
    margin: 40,
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    sku: "78901",
    storeA: { price: 129.99, stock: 15, status: "in-stock" },
    storeB: { price: 124.99, stock: 0, status: "out-of-stock" },
    storeC: { price: 127.99, stock: 8, status: "low-stock" },
    margin: 38,
  },
];

const mockSalesData7Days: SalesData[] = [
  { day: "Monday", storeA: 1200, storeB: 900, storeC: 700 },
  { day: "Tuesday", storeA: 1300, storeB: 850, storeC: 900 },
  { day: "Wednesday", storeA: 1400, storeB: 1000, storeC: 850 },
  { day: "Thursday", storeA: 1500, storeB: 1200, storeC: 950 },
  { day: "Friday", storeA: 1800, storeB: 1400, storeC: 1200 },
  { day: "Saturday", storeA: 2100, storeB: 1700, storeC: 1500 },
  { day: "Sunday", storeA: 1700, storeB: 1300, storeC: 1100 },
];

const mockSalesData30Days: SalesData[] = [
  { day: "Week 1", storeA: 8500, storeB: 7200, storeC: 6300 },
  { day: "Week 2", storeA: 9200, storeB: 7800, storeC: 6800 },
  { day: "Week 3", storeA: 8700, storeB: 7400, storeC: 6500 },
  { day: "Week 4", storeA: 9500, storeB: 8100, storeC: 7200 },
];

const mockSalesData90Days: SalesData[] = [
  { day: "Jan", storeA: 28500, storeB: 24200, storeC: 21300 },
  { day: "Feb", storeA: 29200, storeB: 25800, storeC: 22800 },
  { day: "Mar", storeA: 30700, storeB: 26400, storeC: 23500 },
];

const mockSalesDataYear: SalesData[] = [
  { day: "Q1", storeA: 88500, storeB: 74200, storeC: 61300 },
  { day: "Q2", storeA: 92200, storeB: 78800, storeC: 65800 },
  { day: "Q3", storeA: 87700, storeB: 75400, storeC: 63500 },
  { day: "Q4", storeA: 96500, storeB: 82100, storeC: 68200 },
];

const mockStockDistributionAll: StockDistribution[] = [
  { name: "Electronics", value: 40, color: "#9b59b6" },
  { name: "Clothing", value: 25, color: "#3498db" },
  { name: "Food", value: 15, color: "#e74c3c" },
  { name: "Home", value: 20, color: "#2ecc71" },
];

const mockStockDistributionElectronics: StockDistribution[] = [
  { name: "Phones", value: 30, color: "#9b59b6" },
  { name: "Computers", value: 25, color: "#3498db" },
  { name: "Audio", value: 28, color: "#e74c3c" },
  { name: "Accessories", value: 17, color: "#2ecc71" },
];

const mockStockDistributionClothing: StockDistribution[] = [
  { name: "Men", value: 40, color: "#9b59b6" },
  { name: "Women", value: 45, color: "#3498db" },
  { name: "Children", value: 15, color: "#e74c3c" },
];

const mockStockDistributionFood: StockDistribution[] = [
  { name: "Fresh", value: 35, color: "#9b59b6" },
  { name: "Frozen", value: 25, color: "#3498db" },
  { name: "Canned", value: 20, color: "#e74c3c" },
  { name: "Snacks", value: 20, color: "#2ecc71" },
];

const mockStockDistributionHome: StockDistribution[] = [
  { name: "Kitchen", value: 30, color: "#9b59b6" },
  { name: "Living Room", value: 25, color: "#3498db" },
  { name: "Bedroom", value: 20, color: "#e74c3c" },
  { name: "Bathroom", value: 15, color: "#2ecc71" },
  { name: "Garden", value: 10, color: "#f39c12" },
];

interface ExcelData {
  products: Product[];
  salesData7Days: SalesData[];
  salesData30Days: SalesData[];
  salesData90Days: SalesData[];
  salesDataYear: SalesData[];
  stockDistributionAll: StockDistribution[];
  stockDistributionElectronics: StockDistribution[];
  stockDistributionClothing: StockDistribution[];
  stockDistributionFood: StockDistribution[];
  stockDistributionHome: StockDistribution[];
}

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
  filteredProducts: Product[];
  updateDashboardData: (data: ExcelData) => void;
  getDashboardData: () => ExcelData;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeFilter, setStoreFilter] = useState<StoreFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("7days");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [dashboardProducts, setDashboardProducts] = useState<Product[]>(mockProducts);
  const [dashboardSalesData7Days, setDashboardSalesData7Days] = useState<SalesData[]>(mockSalesData7Days);
  const [dashboardSalesData30Days, setDashboardSalesData30Days] = useState<SalesData[]>(mockSalesData30Days);
  const [dashboardSalesData90Days, setDashboardSalesData90Days] = useState<SalesData[]>(mockSalesData90Days);
  const [dashboardSalesDataYear, setDashboardSalesDataYear] = useState<SalesData[]>(mockSalesDataYear);
  const [dashboardStockDistributionAll, setDashboardStockDistributionAll] = useState<StockDistribution[]>(mockStockDistributionAll);
  const [dashboardStockDistributionElectronics, setDashboardStockDistributionElectronics] = useState<StockDistribution[]>(mockStockDistributionElectronics);
  const [dashboardStockDistributionClothing, setDashboardStockDistributionClothing] = useState<StockDistribution[]>(mockStockDistributionClothing);
  const [dashboardStockDistributionFood, setDashboardStockDistributionFood] = useState<StockDistribution[]>(mockStockDistributionFood);
  const [dashboardStockDistributionHome, setDashboardStockDistributionHome] = useState<StockDistribution[]>(mockStockDistributionHome);
  
  const stats: StoreStats = useMemo(() => {
    const totalProducts = dashboardProducts.length;
    const totalSales = dashboardProducts.reduce((sum, product) => {
      const avgPrice = (product.storeA.price + product.storeB.price + product.storeC.price) / 3;
      const totalStock = product.storeA.stock + product.storeB.stock + product.storeC.stock;
      return sum + (avgPrice * totalStock);
    }, 0);
    
    const avgMargin = Math.round(
      dashboardProducts.reduce((sum, product) => sum + product.margin, 0) / totalProducts
    );
    
    const outOfStock = dashboardProducts.filter(product => 
      product.storeA.status === "out-of-stock" &&
      product.storeB.status === "out-of-stock" &&
      product.storeC.status === "out-of-stock"
    ).length;
    
    return {
      totalProducts,
      totalProductsChange: 12,
      totalSales: Math.round(totalSales),
      totalSalesChange: 8,
      avgMargin,
      avgMarginChange: -2,
      outOfStock,
      outOfStockLabel: "items",
    };
  }, [dashboardProducts]);
  
  const filteredProducts = useMemo(() => {
    let filtered = [...dashboardProducts];
    
    if (storeFilter !== "all") {
      filtered = filtered.filter(product => {
        const storeData = product[storeFilter];
        return storeData.stock > 0;
      });
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(product => {
        if (storeFilter === "all") {
          return (
            product.storeA.status === statusFilter ||
            product.storeB.status === statusFilter ||
            product.storeC.status === statusFilter
          );
        } else {
          return product[storeFilter].status === statusFilter;
        }
      });
    }
    
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "price-high":
          if (storeFilter === "all") {
            const avgPriceA = (a.storeA.price + a.storeB.price + a.storeC.price) / 3;
            const avgPriceB = (b.storeA.price + b.storeB.price + b.storeC.price) / 3;
            return avgPriceB - avgPriceA;
          } else {
            return b[storeFilter].price - a[storeFilter].price;
          }
        case "price-low":
          if (storeFilter === "all") {
            const avgPriceA = (a.storeA.price + a.storeB.price + a.storeC.price) / 3;
            const avgPriceB = (b.storeA.price + b.storeB.price + b.storeC.price) / 3;
            return avgPriceA - avgPriceB;
          } else {
            return a[storeFilter].price - b[storeFilter].price;
          }
        case "margin":
          return b.margin - a.margin;
        default: // best-selling
          if (storeFilter === "all") {
            const totalStockA = a.storeA.stock + a.storeB.stock + a.storeC.stock;
            const totalStockB = b.storeA.stock + b.storeB.stock + b.storeC.stock;
            return totalStockB - totalStockA;
          } else {
            return b[storeFilter].stock - a[storeFilter].stock;
          }
      }
    });
    
    return filtered;
  }, [dashboardProducts, storeFilter, sortOption, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / 10);

  useEffect(() => {
    setCurrentPage(1);
  }, [storeFilter, sortOption, statusFilter]);

  const salesData = useMemo(() => {
    switch (timeRange) {
      case "30days":
        return dashboardSalesData30Days;
      case "90days":
        return dashboardSalesData90Days;
      case "year":
        return dashboardSalesDataYear;
      default:
        return dashboardSalesData7Days;
    }
  }, [timeRange, dashboardSalesData7Days, dashboardSalesData30Days, dashboardSalesData90Days, dashboardSalesDataYear]);

  const stockDistribution = useMemo(() => {
    switch (categoryFilter) {
      case "electronics":
        return dashboardStockDistributionElectronics;
      case "clothing":
        return dashboardStockDistributionClothing;
      case "food":
        return dashboardStockDistributionFood;
      case "home":
        return dashboardStockDistributionHome;
      default:
        return dashboardStockDistributionAll;
    }
  }, [
    categoryFilter,
    dashboardStockDistributionAll,
    dashboardStockDistributionElectronics,
    dashboardStockDistributionClothing,
    dashboardStockDistributionFood,
    dashboardStockDistributionHome
  ]);

  const updateDashboardData = (data: ExcelData) => {
    if (data.products.length) setDashboardProducts(data.products);
    if (data.salesData7Days.length) setDashboardSalesData7Days(data.salesData7Days);
    if (data.salesData30Days.length) setDashboardSalesData30Days(data.salesData30Days);
    if (data.salesData90Days.length) setDashboardSalesData90Days(data.salesData90Days);
    if (data.salesDataYear.length) setDashboardSalesDataYear(data.salesDataYear);
    if (data.stockDistributionAll.length) setDashboardStockDistributionAll(data.stockDistributionAll);
    if (data.stockDistributionElectronics.length) setDashboardStockDistributionElectronics(data.stockDistributionElectronics);
    if (data.stockDistributionClothing.length) setDashboardStockDistributionClothing(data.stockDistributionClothing);
    if (data.stockDistributionFood.length) setDashboardStockDistributionFood(data.stockDistributionFood);
    if (data.stockDistributionHome.length) setDashboardStockDistributionHome(data.stockDistributionHome);
  };

  const getDashboardData = (): ExcelData => {
    return {
      products: dashboardProducts,
      salesData7Days: dashboardSalesData7Days,
      salesData30Days: dashboardSalesData30Days,
      salesData90Days: dashboardSalesData90Days,
      salesDataYear: dashboardSalesDataYear,
      stockDistributionAll: dashboardStockDistributionAll,
      stockDistributionElectronics: dashboardStockDistributionElectronics,
      stockDistributionClothing: dashboardStockDistributionClothing,
      stockDistributionFood: dashboardStockDistributionFood,
      stockDistributionHome: dashboardStockDistributionHome,
    };
  };

  return (
    <DashboardContext.Provider
      value={{
        stats,
        products: dashboardProducts,
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
        filteredProducts,
        updateDashboardData,
        getDashboardData,
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
