
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ExcelDataProvider } from "@/context/ExcelDataContext";
import Index from "./pages/Index";
import ChartsPage from "./pages/ChartsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ExcelDataProvider>
        <TooltipProvider>
          {/* Background blobs for designer look */}
          <div className="blur-blob bg-purple-500/10 h-[400px] w-[400px] top-[10%] left-[-15%] z-0"></div>
          <div className="blur-blob bg-blue-500/10 h-[500px] w-[500px] top-[30%] right-[-20%] z-0"></div>
          <div className="blur-blob bg-pink-500/5 h-[350px] w-[350px] bottom-[5%] left-[20%] z-0 animation-delay-300"></div>
          <div className="blur-blob bg-indigo-500/5 h-[300px] w-[300px] top-[60%] right-[15%] z-0 animation-delay-600"></div>
          
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/charts" element={<ChartsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ExcelDataProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
