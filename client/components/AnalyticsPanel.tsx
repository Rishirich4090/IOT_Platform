import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Zap, Clock, Target, Calendar, Filter } from "lucide-react";

const uptimeData = [
  { time: "00:00", value: 95.2 },
  { time: "04:00", value: 94.8 },
  { time: "08:00", value: 96.1 },
  { time: "12:00", value: 93.7 },
  { time: "16:00", value: 95.9 },
  { time: "20:00", value: 94.3 },
  { time: "24:00", value: 95.8 },
];

const powerUsageData = [
  { time: "00:00", usage: 45.2, target: 50 },
  { time: "04:00", usage: 42.8, target: 50 },
  { time: "08:00", usage: 68.1, target: 70 },
  { time: "12:00", usage: 71.5, target: 70 },
  { time: "16:00", usage: 69.3, target: 70 },
  { time: "20:00", usage: 52.7, target: 55 },
  { time: "24:00", usage: 47.9, target: 50 },
];

const productionData = [
  { hour: "06:00", rate: 124, efficiency: 94.2 },
  { hour: "08:00", rate: 142, efficiency: 96.1 },
  { hour: "10:00", rate: 138, efficiency: 95.3 },
  { hour: "12:00", rate: 115, efficiency: 89.7 },
  { hour: "14:00", rate: 147, efficiency: 97.8 },
  { hour: "16:00", rate: 139, efficiency: 95.8 },
  { hour: "18:00", rate: 128, efficiency: 93.4 },
];

const machineStatusData = [
  { name: "Online", value: 8, color: "#10b981" },
  { name: "Warning", value: 2, color: "#f59e0b" },
  { name: "Offline", value: 1, color: "#6b7280" },
  { name: "Maintenance", value: 1, color: "#3b82f6" },
];

const weeklyTrendData = [
  { day: "Mon", uptime: 94.5, production: 1180, power: 542 },
  { day: "Tue", uptime: 96.2, production: 1247, power: 568 },
  { day: "Wed", uptime: 93.8, production: 1156, power: 534 },
  { day: "Thu", uptime: 95.9, production: 1203, power: 551 },
  { day: "Fri", uptime: 97.1, production: 1289, power: 574 },
  { day: "Sat", uptime: 92.4, production: 1098, power: 498 },
  { day: "Sun", uptime: 89.7, production: 987, power: 456 },
];

export function AnalyticsPanel() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === "value" || entry.dataKey === "efficiency"
                ? "%"
                : ""}
              {entry.dataKey === "usage" || entry.dataKey === "power"
                ? " kW"
                : ""}
              {entry.dataKey === "rate" || entry.dataKey === "production"
                ? " units"
                : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Analytics Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-5 h-5 text-iot-success" />
            <span className="text-xs text-iot-success font-medium">+2.3%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">94.8%</p>
            <p className="text-sm text-muted-foreground">Overall Efficiency</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-5 h-5 text-iot-blue-500" />
            <span className="text-xs text-iot-success font-medium">+12.5%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">1,247</p>
            <p className="text-sm text-muted-foreground">Units Produced</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-5 h-5 text-iot-orange-500" />
            <span className="text-xs text-iot-error font-medium">-5.2%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">71.5</p>
            <p className="text-sm text-muted-foreground">kW Consumed</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-5 h-5 text-iot-blue-500" />
            <span className="text-xs text-iot-success font-medium">+1.8%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">95.2%</p>
            <p className="text-sm text-muted-foreground">Avg Uptime</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Uptime */}
        <div className="metric-card">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Machine Uptime
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={uptimeData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[85, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--iot-blue-500))"
                fill="hsl(var(--iot-blue-500))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Power Usage */}
        <div className="metric-card">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Power Consumption
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={powerUsageData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="hsl(var(--iot-orange-500))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--iot-orange-500))",
                  strokeWidth: 2,
                  r: 4,
                }}
                name="Actual"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--iot-gray-400))"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Production Rate */}
        <div className="metric-card">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Production Rate & Efficiency
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="hour"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                yAxisId="left"
                dataKey="rate"
                fill="hsl(var(--iot-blue-600))"
                name="Production Rate"
                radius={[2, 2, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="efficiency"
                stroke="hsl(var(--iot-success))"
                strokeWidth={2}
                name="Efficiency"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Machine Status Distribution */}
        <div className="metric-card">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Machine Status Distribution
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={machineStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {machineStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="text-sm text-foreground font-medium">
                            {data.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {data.value} machines
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {machineStatusData.map((status, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: status.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {status.name}
                </span>
                <span className="text-sm font-medium text-foreground ml-auto">
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="metric-card">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Weekly Performance Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="uptime"
              stroke="hsl(var(--iot-blue-500))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--iot-blue-500))", strokeWidth: 2, r: 4 }}
              name="Uptime"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="production"
              stroke="hsl(var(--iot-success))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--iot-success))", strokeWidth: 2, r: 4 }}
              name="Production"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="power"
              stroke="hsl(var(--iot-orange-500))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--iot-orange-500))", strokeWidth: 2, r: 4 }}
              name="Power"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
