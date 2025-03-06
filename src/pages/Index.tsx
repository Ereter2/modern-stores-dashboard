
import React from "react";
import { DashboardProvider } from "@/context/DashboardContext";
import Navbar from "@/components/Dashboard/Navbar";
import StatsCard from "@/components/Dashboard/StatsCard";
import ProductsTable from "@/components/Dashboard/ProductsTable";
import SalesChart from "@/components/Dashboard/SalesChart";
import StockChart from "@/components/Dashboard/StockChart";
import FilterDropdown from "@/components/Dashboard/FilterDropdown";
import { useDashboard } from "@/context/DashboardContext";

const DashboardFilters = () => {
  const {
    storeFilter,
    setStoreFilter,
    sortOption,
    setSortOption,
    statusFilter,
    setStatusFilter,
  } = useDashboard();

  const storeOptions = [
    { value: "all", label: "All Stores" },
    { value: "storeA", label: "Store A" },
    { value: "storeB", label: "Store B" },
    { value: "storeC", label: "Store C" },
  ];

  const sortOptions = [
    { value: "best-selling", label: "Best Selling" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "margin", label: "Highest Margin" },
  ];

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in animation-delay-200">
      <FilterDropdown
        label="Store"
        value={storeFilter}
        options={storeOptions}
        onChange={(value) => setStoreFilter(value as any)}
      />

      <FilterDropdown
        label="Sort by"
        value={sortOption}
        options={sortOptions}
        onChange={(value) => setSortOption(value as any)}
      />

      <FilterDropdown
        label="Status"
        value={statusFilter}
        options={statusOptions}
        onChange={(value) => setStatusFilter(value as any)}
      />
    </div>
  );
};

const DashboardContent = () => {
  const { stats } = useDashboard();

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon="products"
          change={stats.totalProductsChange}
          className="animate-slide-up"
          delay={100}
        />
        <StatsCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          icon="sales"
          change={stats.totalSalesChange}
          className="animate-slide-up"
          delay={200}
        />
        <StatsCard
          title="Avg Margin"
          value={stats.avgMargin}
          suffix="%"
          icon="margin"
          change={stats.avgMarginChange}
          className="animate-slide-up"
          delay={300}
        />
        <StatsCard
          title="Out of Stock"
          value={stats.outOfStock}
          suffix={stats.outOfStockLabel}
          icon="stock"
          className="animate-slide-up"
          delay={400}
        />
      </div>

      <ProductsTable />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <StockChart />
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-[1600px] mx-auto">
          <Navbar />
          <div className="p-6">
            <DashboardFilters />
            <DashboardContent />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
