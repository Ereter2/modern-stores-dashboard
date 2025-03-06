
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

  return (
    <div className="glass-card rounded-lg h-full animate-slide-up animation-delay-400">
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
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStoreB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7E69AB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStoreC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6E59A5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6E59A5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 30, 46, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
              }}
              labelStyle={{ color: "#f3f4f6", marginBottom: "0.5rem" }}
              formatter={(value: number) => [`$${value}`, ""]}
            />
            <Legend
              formatter={(value) => (
                <span
                  style={{
                    color: getOpacity(value) === 1 ? "#f3f4f6" : "#9ca3af",
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
              stroke="#9b87f5"
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
              stroke="#7E69AB"
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
              stroke="#6E59A5"
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
  );
};

export default SalesChart;
