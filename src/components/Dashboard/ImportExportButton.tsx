
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DownloadCloud, UploadCloud } from "lucide-react";
import { useExcelData } from "@/context/ExcelDataContext";
import { useDashboard } from "@/context/DashboardContext";

const ImportExportButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleImport, handleExport, isImporting } = useExcelData();
  const { updateDashboardData, getDashboardData } = useDashboard();

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const excelData = await handleImport(file);
      if (excelData) {
        updateDashboardData(excelData);
      }
      // Reset the input
      e.target.value = '';
    }
  };

  const onExport = () => {
    const data = getDashboardData();
    handleExport(data);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="border-violet-500/20 hover:border-violet-500/50 bg-background hover:bg-violet-500/10"
          >
            <DownloadCloud className="mr-2 h-4 w-4 text-violet-500" /> Import/Export
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="flex flex-col gap-2">
            <Button 
              onClick={triggerFileInput} 
              className="justify-start"
              disabled={isImporting}
            >
              <UploadCloud className="mr-2 h-4 w-4" />
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
