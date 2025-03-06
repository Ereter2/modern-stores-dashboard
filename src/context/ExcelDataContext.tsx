
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { SalesData, Product, StockDistribution } from "@/types/dashboard";
import * as XLSX from "xlsx";

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

interface ExcelDataContextType {
  handleImport: (file: File) => Promise<ExcelData | null>;
  handleExport: (data: ExcelData) => void;
  isImporting: boolean;
}

const ExcelDataContext = createContext<ExcelDataContextType | undefined>(undefined);

export const ExcelDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async (file: File): Promise<ExcelData | null> => {
    try {
      setIsImporting(true);
      
      // Read the Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Process each sheet
      const products = XLSX.utils.sheet_to_json<Product>(workbook.Sheets["Products"] || {});
      const salesData7Days = XLSX.utils.sheet_to_json<SalesData>(workbook.Sheets["SalesData7Days"] || {});
      const salesData30Days = XLSX.utils.sheet_to_json<SalesData>(workbook.Sheets["SalesData30Days"] || {});
      const salesData90Days = XLSX.utils.sheet_to_json<SalesData>(workbook.Sheets["SalesData90Days"] || {});
      const salesDataYear = XLSX.utils.sheet_to_json<SalesData>(workbook.Sheets["SalesDataYear"] || {});
      const stockDistributionAll = XLSX.utils.sheet_to_json<StockDistribution>(workbook.Sheets["StockDistAll"] || {});
      const stockDistributionElectronics = XLSX.utils.sheet_to_json<StockDistribution>(workbook.Sheets["StockDistElec"] || {});
      const stockDistributionClothing = XLSX.utils.sheet_to_json<StockDistribution>(workbook.Sheets["StockDistCloth"] || {});
      const stockDistributionFood = XLSX.utils.sheet_to_json<StockDistribution>(workbook.Sheets["StockDistFood"] || {});
      const stockDistributionHome = XLSX.utils.sheet_to_json<StockDistribution>(workbook.Sheets["StockDistHome"] || {});
      
      // Validate data
      if (!products.length) {
        toast.error("No product data found in the Excel file");
        return null;
      }

      const excelData: ExcelData = {
        products: products as Product[],
        salesData7Days: salesData7Days as SalesData[],
        salesData30Days: salesData30Days as SalesData[],
        salesData90Days: salesData90Days as SalesData[],
        salesDataYear: salesDataYear as SalesData[],
        stockDistributionAll: stockDistributionAll as StockDistribution[],
        stockDistributionElectronics: stockDistributionElectronics as StockDistribution[],
        stockDistributionClothing: stockDistributionClothing as StockDistribution[],
        stockDistributionFood: stockDistributionFood as StockDistribution[],
        stockDistributionHome: stockDistributionHome as StockDistribution[],
      };

      toast.success("Data imported successfully");
      return excelData;
    } catch (error) {
      console.error("Error importing Excel data:", error);
      toast.error("Failed to import data. Please check the file format.");
      return null;
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = (data: ExcelData) => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Add sheets for each data type
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.products), "Products");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.salesData7Days), "SalesData7Days");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.salesData30Days), "SalesData30Days");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.salesData90Days), "SalesData90Days");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.salesDataYear), "SalesDataYear");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.stockDistributionAll), "StockDistAll");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.stockDistributionElectronics), "StockDistElec");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.stockDistributionClothing), "StockDistCloth");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.stockDistributionFood), "StockDistFood");
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.stockDistributionHome), "StockDistHome");
      
      // Generate and download the file
      XLSX.writeFile(wb, "StoresDashboard_Data.xlsx");
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting Excel data:", error);
      toast.error("Failed to export data");
    }
  };

  return (
    <ExcelDataContext.Provider value={{ handleImport, handleExport, isImporting }}>
      {children}
    </ExcelDataContext.Provider>
  );
};

export const useExcelData = () => {
  const context = useContext(ExcelDataContext);
  if (!context) {
    throw new Error("useExcelData must be used within an ExcelDataProvider");
  }
  return context;
};
