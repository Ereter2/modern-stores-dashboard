
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Package, DollarSign, Percent, AlertTriangle } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: "products" | "sales" | "margin" | "stock";
  change?: number;
  suffix?: string;
  className?: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  suffix,
  className,
  delay = 0,
}) => {
  const iconMap = {
    products: <Package className="h-5 w-5" />,
    sales: <DollarSign className="h-5 w-5" />,
    margin: <Percent className="h-5 w-5" />,
    stock: <AlertTriangle className="h-5 w-5" />,
  };

  const iconColorMap = {
    products: "bg-blue-500/10 text-blue-500",
    sales: "bg-green-500/10 text-green-500",
    margin: "bg-violet-500/10 text-violet-500",
    stock: "bg-orange-500/10 text-orange-500",
  };

  return (
    <div
      className={cn(
        "rounded-lg glass-card p-5 transition-all hover:shadow-xl",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <div className={cn("p-2 rounded-full", iconColorMap[icon])}>
          {iconMap[icon]}
        </div>
      </div>
      <div className="flex items-baseline">
        <h3 className="text-2xl font-bold">{value}</h3>
        {suffix && <span className="ml-1 text-muted-foreground text-sm">{suffix}</span>}
      </div>
      {typeof change !== "undefined" && (
        <div className="mt-2 flex items-center">
          {change > 0 ? (
            <div className="flex items-center text-positive text-xs font-medium">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+{change}%</span>
            </div>
          ) : change < 0 ? (
            <div className="flex items-center text-negative text-xs font-medium">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>{change}%</span>
            </div>
          ) : (
            <div className="flex items-center text-muted-foreground text-xs font-medium">
              <span>No change</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
