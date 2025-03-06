
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DownloadCloud, UploadCloud, Info, Loader2 } from "lucide-react";
import { useExcelData } from "@/context/ExcelDataContext";
import { useDashboard } from "@/context/DashboardContext";
import { toast } from "sonner";

const ImportExportButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleImport, handleExport, isImporting } = useExcelData();
  const { updateDashboardData, getDashboardData } = useDashboard();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        toast.info(`Importing file: ${file.name}`, {
          description: "Please wait while we process your data...",
          duration: 2000
        });
        
        setIsPopoverOpen(false);
        const excelData = await handleImport(file);
        
        if (excelData && excelData.products && excelData.products.length > 0) {
          console.log("Imported Excel data:", excelData);
          updateDashboardData(excelData);
          toast.success(`Successfully imported ${excelData.products.length} products`);
        } else {
          toast.error("Failed to import data. No valid products found.");
        }
      } catch (error) {
        console.error("Error in import process:", error);
        toast.error("An unexpected error occurred during import");
      } finally {
        // Reset the input
        e.target.value = '';
      }
    }
  };

  const onExport = () => {
    try {
      const data = getDashboardData();
      handleExport(data);
      setIsPopoverOpen(false);
    } catch (error) {
      console.error("Error during export:", error);
      toast.error("Failed to export data");
    }
  };
  
  const showExcelFormat = () => {
    toast(
      <div className="space-y-2">
        <h3 className="font-medium">Required Excel Format</h3>
        <p className="text-xs text-muted-foreground">Your Excel file should contain the following sheets:</p>
        <ul className="text-xs list-disc pl-4 space-y-1">
          <li><b>Products:</b> id, name, sku, prices, stocks & margins</li>
          <li><b>SalesData7Days, SalesData30Days, etc.:</b> daily sales data</li>
          <li><b>StockDistAll, StockDistElec, etc.:</b> stock distribution data</li>
        </ul>
      </div>,
      {
        duration: 7000,
        icon: <Info className="h-4 w-4" />,
      }
    );
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="border-violet-500/20 hover:border-violet-500/50 bg-background hover:bg-violet-500/10"
          >
            {isImporting ? (
              <Loader2 className="mr-2 h-4 w-4 text-violet-500 animate-spin" />
            ) : (
              <DownloadCloud className="mr-2 h-4 w-4 text-violet-500" />
            )}
            Import/Export
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="flex flex-col gap-2">
            <Button 
              onClick={triggerFileInput} 
              className="justify-start"
              disabled={isImporting}
            >
              {isImporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UploadCloud className="mr-2 h-4 w-4" />
              )}
              Import Excel Data
            </Button>
            <Button 
              onClick={onExport} 
              className="justify-start"
              variant="outline"
            >
              <DownloadCloud className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
            <Button
              onClick={showExcelFormat}
              variant="ghost"
              className="justify-start text-xs"
              size="sm"
            >
              <Info className="mr-2 h-3 w-3" />
              View Required Format
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        accept=".xlsx, .xls" 
        className="hidden" 
      />
    </>
  );
};

export default ImportExportButton;
