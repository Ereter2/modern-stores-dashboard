
import React, { useState } from "react";
import { DashboardProvider } from "@/context/DashboardContext";
import Navbar from "@/components/Dashboard/Navbar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import FilterDropdown from "@/components/Dashboard/FilterDropdown";

// Improved color palette for better contrast
const CHART_COLORS = [
  "#9b59b6", // Purple
  "#3498db", // Blue
  "#e74c3c", // Red
  "#2ecc71", // Green
  "#f39c12", // Orange
  "#1abc9c", // Turquoise
];

// Demo data for charts
const barData = [
  { name: "Jan", storeA: 4000, storeB: 2400, storeC: 1800 },
  { name: "Feb", storeA: 3000, storeB: 1398, storeC: 2800 },
  { name: "Mar", storeA: 2000, storeB: 9800, storeC: 2200 },
  { name: "Apr", storeA: 2780, storeB: 3908, storeC: 3000 },
  { name: "May", storeA: 1890, storeB: 4800, storeC: 2500 },
  { name: "Jun", storeA: 2390, storeB: 3800, storeC: 3200 },
  { name: "Jul", storeA: 3490, storeB: 4300, storeC: 2800 },
];

const areaData = [
  { month: "Jan", electronics: 4000, clothing: 2400, food: 2400, home: 1200 },
  { month: "Feb", electronics: 3000, clothing: 1398, food: 2210, home: 1800 },
  { month: "Mar", electronics: 2000, clothing: 9800, food: 2290, home: 2500 },
  { month: "Apr", electronics: 2780, clothing: 3908, food: 2000, home: 2100 },
  { month: "May", electronics: 1890, clothing: 4800, food: 2181, home: 1500 },
  { month: "Jun", electronics: 2390, clothing: 3800, food: 2500, home: 2000 },
  { month: "Jul", electronics: 3490, clothing: 4300, food: 2100, home: 1700 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 300 },
  { name: "Home", value: 200 },
  { name: "Sports", value: 150 },
  { name: "Books", value: 100 },
];

const radarData = [
  { subject: "Sales", A: 120, B: 110, C: 130, fullMark: 150 },
  { subject: "Marketing", A: 98, B: 130, C: 70, fullMark: 150 },
  { subject: "Development", A: 86, B: 130, C: 110, fullMark: 150 },
  { subject: "Support", A: 99, B: 100, C: 80, fullMark: 150 },
  { subject: "Admin", A: 85, B: 90, C: 120, fullMark: 150 },
  { subject: "Finance", A: 65, B: 85, C: 100, fullMark: 150 },
];

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass-card rounded-lg animate-slide-up">
    <div className="p-5 border-b border-border">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="p-5 h-[400px]">{children}</div>
  </div>
);

const ChartsPage = () => {
  const [chartType, setChartType] = useState<string>("all");
  
  const chartOptions = [
    { value: "all", label: "All Charts" },
    { value: "bar", label: "Bar Charts" },
    { value: "line", label: "Line Charts" },
    { value: "area", label: "Area Charts" },
    { value: "pie", label: "Pie Charts" },
    { value: "radar", label: "Radar Charts" },
  ];

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-[1600px] mx-auto">
          <Navbar />
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 animate-fade-in">
              <h1 className="text-2xl font-bold">Advanced Charts</h1>
              <FilterDropdown
                label="Chart Type"
                value={chartType}
                options={chartOptions}
                onChange={(value) => setChartType(value)}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(chartType === "all" || chartType === "bar") && (
                <ChartCard title="Monthly Sales (Bar Chart)">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
                      <YAxis stroke="currentColor" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "var(--secondary)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="storeA" name="Store A" fill={CHART_COLORS[0]} />
                      <Bar dataKey="storeB" name="Store B" fill={CHART_COLORS[1]} />
                      <Bar dataKey="storeC" name="Store C" fill={CHART_COLORS[2]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}
              
              {(chartType === "all" || chartType === "line") && (
                <ChartCard title="Sales Trends (Line Chart)">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
                      <YAxis stroke="currentColor" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "var(--secondary)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="storeA" name="Store A" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="storeB" name="Store B" stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="storeC" name="Store C" stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}
              
              {(chartType === "all" || chartType === "area") && (
                <ChartCard title="Category Performance (Area Chart)">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData}>
                      <defs>
                        {["electronics", "clothing", "food", "home"].map((key, index) => (
                          <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS[index]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={CHART_COLORS[index]} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="month" stroke="currentColor" fontSize={12} />
                      <YAxis stroke="currentColor" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "var(--secondary)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="electronics" name="Electronics" stroke={CHART_COLORS[0]} fillOpacity={1} fill={`url(#colorelectronics)`} />
                      <Area type="monotone" dataKey="clothing" name="Clothing" stroke={CHART_COLORS[1]} fillOpacity={1} fill={`url(#colorclothing)`} />
                      <Area type="monotone" dataKey="food" name="Food" stroke={CHART_COLORS[2]} fillOpacity={1} fill={`url(#colorfood)`} />
                      <Area type="monotone" dataKey="home" name="Home" stroke={CHART_COLORS[3]} fillOpacity={1} fill={`url(#colorhome)`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}
              
              {(chartType === "all" || chartType === "pie") && (
                <ChartCard title="Category Distribution (Pie Chart)">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--secondary)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}
              
              {(chartType === "all" || chartType === "radar") && (
                <ChartCard title="Department Performance (Radar Chart)">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={120} data={radarData}>
                      <PolarGrid stroke="currentColor" opacity={0.2} />
                      <PolarAngleAxis dataKey="subject" stroke="currentColor" />
                      <PolarRadiusAxis stroke="currentColor" opacity={0.5} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--secondary)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Radar name="Team A" dataKey="A" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.6} />
                      <Radar name="Team B" dataKey="B" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.6} />
                      <Radar name="Team C" dataKey="C" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default ChartsPage;
