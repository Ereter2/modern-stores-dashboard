
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
      console.log("Starting import process...");
      
      // Read the Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      console.log("Available sheets:", workbook.SheetNames);
      
      // Check if we have any sheets at all
      if (!workbook.SheetNames.length) {
        toast.error("The Excel file doesn't contain any sheets");
        return null;
      }
      
      // Try to find the Products sheet (case-insensitive search)
      const productsSheetName = workbook.SheetNames.find(
        name => name.toLowerCase() === "products"
      ) || workbook.SheetNames[0]; // Fall back to first sheet
      
      console.log("Using sheet for products:", productsSheetName);
      
      // Process each sheet, providing fallbacks
      const products = XLSX.utils.sheet_to_json<Product>(
        workbook.Sheets[productsSheetName] || {}
      );
      
      // Log the first product to help debug
      if (products.length) {
        console.log("First product sample:", products[0]);
      } else {
        console.log("No products found in sheet:", productsSheetName);
      }
      
      // Function to safely get a sheet and convert to JSON
      const getSheetData = <T,>(sheetNameOptions: string[]): T[] => {
        for (const name of sheetNameOptions) {
          const sheetName = workbook.SheetNames.find(
            s => s.toLowerCase() === name.toLowerCase()
          );
          if (sheetName && workbook.Sheets[sheetName]) {
            return XLSX.utils.sheet_to_json<T>(workbook.Sheets[sheetName]);
          }
        }
        return [];
      };
      
      const salesData7Days = getSheetData<SalesData>(['SalesData7Days', '7 Days', 'Sales7Days']);
      const salesData30Days = getSheetData<SalesData>(['SalesData30Days', '30 Days', 'Sales30Days']);
      const salesData90Days = getSheetData<SalesData>(['SalesData90Days', '90 Days', 'Sales90Days']);
      const salesDataYear = getSheetData<SalesData>(['SalesDataYear', 'Year', 'YearlySales']);
      const stockDistributionAll = getSheetData<StockDistribution>(['StockDistAll', 'Stock All', 'StockDistribution']);
      const stockDistributionElectronics = getSheetData<StockDistribution>(['StockDistElec', 'Electronics', 'StockElectronics']);
      const stockDistributionClothing = getSheetData<StockDistribution>(['StockDistCloth', 'Clothing', 'StockClothing']);
      const stockDistributionFood = getSheetData<StockDistribution>(['StockDistFood', 'Food', 'StockFood']);
      const stockDistributionHome = getSheetData<StockDistribution>(['StockDistHome', 'Home', 'StockHome']);
      
      // Validate data - now more flexible but still shows user feedback
      if (!products.length) {
        const errorMessage = `No product data found in the Excel file. Please ensure your file has a sheet named 'Products' with columns for product details.`;
        toast.error(errorMessage);
        console.error(errorMessage);
        
        // Show sheet names to help user
        toast.error(`Available sheets: ${workbook.SheetNames.join(', ')}`);
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
