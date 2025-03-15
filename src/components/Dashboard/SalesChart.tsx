
import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useDashboard } from "@/context/DashboardContext";
import FilterDropdown from "./FilterDropdown";

// Improved color palette for better contrast
const CHART_COLORS = {
  storeA: {
    stroke: "#9b59b6", // Purple
    fill: "#9b59b6",
  },
  storeB: {
    stroke: "#3498db", // Blue
    fill: "#3498db",
  },
  storeC: {
    stroke: "#e74c3c", // Red
    fill: "#e74c3c",
  },
};

const SalesChart: React.FC = () => {
  const { salesData, timeRange, setTimeRange } = useDashboard();
  const [activeStore, setActiveStore] = useState<string | null>(null);

  const timeRangeOptions = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
    { value: "year", label: "This year" },
  ];

  const handleLegendClick = (store: string) => {
    setActiveStore(activeStore === store ? null : store);
  };

  const getOpacity = (store: string) => {
    if (activeStore === null) return 1;
    return activeStore === store ? 1 : 0.3;
  };

  // Get the glow color
  const getGlowColor = () => {
    return "#8B5CF6";
  };

  return (
    <div className="relative h-full animate-slide-up animation-delay-400">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 rounded-lg blur-xl z-0 opacity-80"
        style={{ 
          backgroundColor: getGlowColor(),
          transform: 'scale(0.95)',
          animation: 'pulse 3s infinite alternate',
        }}
      />
      
      {/* Card content */}
      <div className="glass-card rounded-lg h-full relative z-10 backdrop-blur-sm shadow-lg border border-white/10">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sales Comparison</h2>
          <FilterDropdown
            label="Period"
            value={timeRange}
            options={timeRangeOptions}
            onChange={(value) => setTimeRange(value as any)}
          />
        </div>
        <div className="p-5 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorStoreA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.storeA.fill} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={CHART_COLORS.storeA.fill} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorStoreB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.storeB.fill} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={CHART_COLORS.storeB.fill} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorStoreC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.storeC.fill} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={CHART_COLORS.storeC.fill} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--secondary)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                }}
                labelStyle={{ color: "var(--foreground)", marginBottom: "0.5rem" }}
                formatter={(value: number) => [`$${value}`, ""]}
              />
              <Legend
                formatter={(value) => (
                  <span
                    style={{
                      color: getOpacity(value) === 1 ? "var(--foreground)" : "var(--muted-foreground)",
                      cursor: "pointer",
                    }}
                    onClick={() => handleLegendClick(value)}
                  >
                    {value === "storeA" ? "Store A" : value === "storeB" ? "Store B" : "Store C"}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="storeA"
                stroke={CHART_COLORS.storeA.stroke}
                fillOpacity={1}
                fill="url(#colorStoreA)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                style={{ opacity: getOpacity("storeA") }}
              />
              <Area
                type="monotone"
                dataKey="storeB"
                stroke={CHART_COLORS.storeB.stroke}
                fillOpacity={1}
                fill="url(#colorStoreB)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                style={{ opacity: getOpacity("storeB") }}
              />
              <Area
                type="monotone"
                dataKey="storeC"
                stroke={CHART_COLORS.storeC.stroke}
                fillOpacity={1}
                fill="url(#colorStoreC)"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                style={{ opacity: getOpacity("storeC") }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
