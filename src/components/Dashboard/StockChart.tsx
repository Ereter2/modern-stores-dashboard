
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useDashboard } from "@/context/DashboardContext";
import FilterDropdown from "./FilterDropdown";

// Improved color palette for better contrast
const CHART_COLORS = [
  "#9b59b6", // Purple
  "#3498db", // Blue
  "#e74c3c", // Red
  "#2ecc71", // Green
  "#f39c12", // Orange
  "#1abc9c", // Turquoise
];

const StockChart: React.FC = () => {
  const { stockDistribution, categoryFilter, setCategoryFilter } = useDashboard();

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "food", label: "Food" },
    { value: "home", label: "Home" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary/90 backdrop-blur-lg border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-muted-foreground text-sm">
            {payload[0].value}% ({Math.round((payload[0].value / 100) * 90)} products)
          </p>
        </div>
      );
    }
    return null;
  };

  // Apply new colors to data
  const colorizedData = stockDistribution.map((item, index) => ({
    ...item,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <div className="glass-card rounded-lg h-full animate-slide-up animation-delay-500">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Stock Distribution</h2>
        <FilterDropdown
          label="Category"
          value={categoryFilter}
          options={categoryOptions}
          onChange={(value) => setCategoryFilter(value as any)}
        />
      </div>
      <div className="p-5 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={colorizedData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              stroke="transparent"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                name,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                return (
                  <text
                    x={x}
                    y={y}
                    fill="currentColor"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-xs"
                  >
                    {`${name} (${(percent * 100).toFixed(0)}%)`}
                  </text>
                );
              }}
            >
              {colorizedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
