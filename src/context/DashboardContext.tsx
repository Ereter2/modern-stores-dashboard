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

// Fonction pour charger les données depuis localStorage
const loadDataFromLocalStorage = (): ExcelData | null => {
  try {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      console.log("Chargement des données depuis localStorage:", savedData.substring(0, 100) + "...");
      return JSON.parse(savedData);
    }
    return null;
  } catch (error) {
    console.error("Erreur lors du chargement des données depuis localStorage:", error);
    return null;
  }
};

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
  resetDashboardData: () => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeFilter, setStoreFilter] = useState<StoreFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("7days");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Charger les données initiales depuis localStorage ou utiliser les données par défaut
  const initialData = loadDataFromLocalStorage();
  
  console.log("Données initiales chargées:", initialData ? "Données trouvées" : "Pas de données, utilisation des valeurs par défaut");
  
  const [dashboardProducts, setDashboardProducts] = useState<Product[]>(
    initialData?.products || mockProducts
  );
  const [dashboardSalesData7Days, setDashboardSalesData7Days] = useState<SalesData[]>(
    initialData?.salesData7Days || mockSalesData7Days
  );
  const [dashboardSalesData30Days, setDashboardSalesData30Days] = useState<SalesData[]>(
    initialData?.salesData30Days || mockSalesData30Days
  );
  const [dashboardSalesData90Days, setDashboardSalesData90Days] = useState<SalesData[]>(
    initialData?.salesData90Days || mockSalesData90Days
  );
  const [dashboardSalesDataYear, setDashboardSalesDataYear] = useState<SalesData[]>(
    initialData?.salesDataYear || mockSalesDataYear
  );
  const [dashboardStockDistributionAll, setDashboardStockDistributionAll] = useState<StockDistribution[]>(
    initialData?.stockDistributionAll || mockStockDistributionAll
  );
  const [dashboardStockDistributionElectronics, setDashboardStockDistributionElectronics] = useState<StockDistribution[]>(
    initialData?.stockDistributionElectronics || mockStockDistributionElectronics
  );
  const [dashboardStockDistributionClothing, setDashboardStockDistributionClothing] = useState<StockDistribution[]>(
    initialData?.stockDistributionClothing || mockStockDistributionClothing
  );
  const [dashboardStockDistributionFood, setDashboardStockDistributionFood] = useState<StockDistribution[]>(
    initialData?.stockDistributionFood || mockStockDistributionFood
  );
  const [dashboardStockDistributionHome, setDashboardStockDistributionHome] = useState<StockDistribution[]>(
    initialData?.stockDistributionHome || mockStockDistributionHome
  );
  
  const stats: StoreStats = useMemo(() => {
    try {
      const totalProducts = dashboardProducts.length;
      
      if (totalProducts === 0) {
        return mockStoreStats;
      }
      
      const totalSales = dashboardProducts.reduce((sum, product) => {
        const storeAPrice = product.storeA?.price || 0;
        const storeBPrice = product.storeB?.price || 0;
        const storeCPrice = product.storeC?.price || 0;
        
        const storeAStock = product.storeA?.stock || 0;
        const storeBStock = product.storeB?.stock || 0;
        const storeCStock = product.storeC?.stock || 0;
        
        const avgPrice = (storeAPrice + storeBPrice + storeCPrice) / 3;
        const totalStock = storeAStock + storeBStock + storeCStock;
        
        return sum + (avgPrice * totalStock);
      }, 0);
      
      const avgMargin = totalProducts > 0 
        ? Math.round(
            dashboardProducts.reduce((sum, product) => sum + (product.margin || 0), 0) / totalProducts
          )
        : 0;
      
      const outOfStock = dashboardProducts.filter(product => 
        (product.storeA?.status === "out-of-stock" || !product.storeA) &&
        (product.storeB?.status === "out-of-stock" || !product.storeB) &&
        (product.storeC?.status === "out-of-stock" || !product.storeC)
      ).length;
      
      return {
        totalProducts,
        totalProductsChange: 12, // Default value
        totalSales: Math.round(totalSales),
        totalSalesChange: 8, // Default value
        avgMargin,
        avgMarginChange: -2, // Default value
        outOfStock,
        outOfStockLabel: "items",
      };
    } catch (error) {
      console.error("Error calculating stats:", error);
      return mockStoreStats;
    }
  }, [dashboardProducts]);
  
  const filteredProducts = useMemo(() => {
    try {
      let filtered = [...dashboardProducts];
      
      if (storeFilter !== "all") {
        filtered = filtered.filter(product => {
          const storeData = product[storeFilter];
          return storeData && storeData.stock > 0;
        });
      }
      
      if (statusFilter !== "all") {
        filtered = filtered.filter(product => {
          if (storeFilter === "all") {
            return (
              (product.storeA && product.storeA.status === statusFilter) ||
              (product.storeB && product.storeB.status === statusFilter) ||
              (product.storeC && product.storeC.status === statusFilter)
            );
          } else {
            return product[storeFilter] && product[storeFilter].status === statusFilter;
          }
        });
      }
      
      filtered.sort((a, b) => {
        switch (sortOption) {
          case "price-high":
            if (storeFilter === "all") {
              const avgPriceA = ((a.storeA?.price || 0) + (a.storeB?.price || 0) + (a.storeC?.price || 0)) / 3;
              const avgPriceB = ((b.storeA?.price || 0) + (b.storeB?.price || 0) + (b.storeC?.price || 0)) / 3;
              return avgPriceB - avgPriceA;
            } else {
              return (b[storeFilter]?.price || 0) - (a[storeFilter]?.price || 0);
            }
          case "price-low":
            if (storeFilter === "all") {
              const avgPriceA = ((a.storeA?.price || 0) + (a.storeB?.price || 0) + (a.storeC?.price || 0)) / 3;
              const avgPriceB = ((b.storeA?.price || 0) + (b.storeB?.price || 0) + (b.storeC?.price || 0)) / 3;
              return avgPriceA - avgPriceB;
            } else {
              return (a[storeFilter]?.price || 0) - (b[storeFilter]?.price || 0);
            }
          case "margin":
            return (b.margin || 0) - (a.margin || 0);
          default: // best-selling
            if (storeFilter === "all") {
              const totalStockA = (a.storeA?.stock || 0) + (a.storeB?.stock || 0) + (a.storeC?.stock || 0);
              const totalStockB = (b.storeA?.stock || 0) + (b.storeB?.stock || 0) + (b.storeC?.stock || 0);
              return totalStockB - totalStockA;
            } else {
              return (b[storeFilter]?.stock || 0) - (a[storeFilter]?.stock || 0);
            }
        }
      });
      
      return filtered;
    } catch (error) {
      console.error("Error filtering products:", error);
      return [];
    }
  }, [dashboardProducts, storeFilter, sortOption, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 10));

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
    console.log("Updating dashboard with imported data:", data);
    try {
      if (data.products && data.products.length) {
        console.log(`Setting ${data.products.length} products`);
        setDashboardProducts(data.products);
      }
      
      if (data.salesData7Days && data.salesData7Days.length) {
        setDashboardSalesData7Days(data.salesData7Days);
      }
      
      if (data.salesData30Days && data.salesData30Days.length) {
        setDashboardSalesData30Days(data.salesData30Days);
      }
      
      if (data.salesData90Days && data.salesData90Days.length) {
        setDashboardSalesData90Days(data.salesData90Days);
      }
      
      if (data.salesDataYear && data.salesDataYear.length) {
        setDashboardSalesDataYear(data.salesDataYear);
      }
      
      if (data.stockDistributionAll && data.stockDistributionAll.length) {
        setDashboardStockDistributionAll(data.stockDistributionAll);
      }
      
      if (data.stockDistributionElectronics && data.stockDistributionElectronics.length) {
        setDashboardStockDistributionElectronics(data.stockDistributionElectronics);
      }
      
      if (data.stockDistributionClothing && data.stockDistributionClothing.length) {
        setDashboardStockDistributionClothing(data.stockDistributionClothing);
      }
      
      if (data.stockDistributionFood && data.stockDistributionFood.length) {
        setDashboardStockDistributionFood(data.stockDistributionFood);
      }
      
      if (data.stockDistributionHome && data.stockDistributionHome.length) {
        setDashboardStockDistributionHome(data.stockDistributionHome);
      }
      
      // Sauvegarder les données mises à jour dans localStorage
      const dataToSave = getDashboardData();
      const dataString = JSON.stringify(dataToSave);
      console.log("Saving data to localStorage, size:", dataString.length, "bytes");
      localStorage.setItem('dashboardData', dataString);
    } catch (error) {
      console.error("Error updating dashboard data:", error);
    }
  };

  // Utiliser useEffect pour sauvegarder les données dans localStorage chaque fois qu'elles changent
  useEffect(() => {
    try {
      const dataToSave = getDashboardData();
      const dataString = JSON.stringify(dataToSave);
      console.log("Auto-saving data to localStorage, size:", dataString.length, "bytes");
      localStorage.setItem('dashboardData', dataString);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde automatique des données:", error);
    }
  }, [
    dashboardProducts, 
    dashboardSalesData7Days, 
    dashboardSalesData30Days,
    dashboardSalesData90Days,
    dashboardSalesDataYear,
    dashboardStockDistributionAll,
    dashboardStockDistributionElectronics,
    dashboardStockDistributionClothing,
    dashboardStockDistributionFood,
    dashboardStockDistributionHome
  ]);

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
  
  const resetDashboardData = () => {
    try {
      localStorage.removeItem('dashboardData');
      setDashboardProducts(mockProducts);
      setDashboardSalesData7Days(mockSalesData7Days);
      setDashboardSalesData30Days(mockSalesData30Days);
      setDashboardSalesData90Days(mockSalesData90Days);
      setDashboardSalesDataYear(mockSalesDataYear);
      setDashboardStockDistributionAll(mockStockDistributionAll);
      setDashboardStockDistributionElectronics(mockStockDistributionElectronics);
      setDashboardStockDistributionClothing(mockStockDistributionClothing);
      setDashboardStockDistributionFood(mockStockDistributionFood);
      setDashboardStockDistributionHome(mockStockDistributionHome);
    } catch (error) {
      console.error("Error resetting dashboard data:", error);
    }
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
        resetDashboardData,
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
