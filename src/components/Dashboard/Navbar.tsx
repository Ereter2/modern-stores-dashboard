
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LineChart } from "lucide-react";
import ImportExportButton from "./ImportExportButton";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border/30 bg-background/60 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <span className="font-bold text-white">S</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">Stores Dashboard</span>
            </Link>
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/">
                <Button 
                  variant={location.pathname === "/" ? "default" : "ghost"} 
                  size="sm"
                  className={location.pathname === "/" ? "bg-primary/90 hover:bg-primary" : "hover:bg-background/80"}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/charts">
                <Button 
                  variant={location.pathname === "/charts" ? "default" : "ghost"} 
                  size="sm"
                  className={location.pathname === "/charts" ? "bg-primary/90 hover:bg-primary" : "hover:bg-background/80"}
                >
                  <LineChart className="h-4 w-4 mr-2" />
                  Charts
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs px-2 py-1 bg-positive/10 text-positive rounded-full border border-positive/20">Live Data</span>
            <ImportExportButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
