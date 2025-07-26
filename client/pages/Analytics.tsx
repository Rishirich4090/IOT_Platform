import React, { useState, useEffect } from "react";
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
  ScatterChart,
  Scatter,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Thermometer,
  Activity,
  Droplets,
  Clock,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpDown,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface MachineData {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "online" | "offline" | "warning" | "error";
  currentMetrics: {
    temperature: number;
    vibration: number;
    humidity: number;
    powerUsage: number;
    efficiency: number;
    speed: number;
  };
  historicalData: {
    hourly: Array<{
      time: string;
      temperature: number;
      vibration: number;
      humidity: number;
      powerUsage: number;
      efficiency: number;
      speed: number;
      production: number;
    }>;
    daily: Array<{
      date: string;
      avgTemperature: number;
      avgVibration: number;
      avgHumidity: number;
      totalPower: number;
      avgEfficiency: number;
      totalProduction: number;
      uptime: number;
      alerts: number;
    }>;
  };
  performance: {
    uptime: number;
    mtbf: number; // Mean Time Between Failures
    mttr: number; // Mean Time To Repair
    oee: number; // Overall Equipment Effectiveness
    totalProduction: number;
    energyEfficiency: number;
  };
}

const machinesData: MachineData[] = [
  {
    id: "M001",
    name: "CNC Machine A1",
    type: "CNC Machining Center",
    location: "Production Line A - Station 1",
    status: "online",
    currentMetrics: {
      temperature: 68.5,
      vibration: 0.3,
      humidity: 45.2,
      powerUsage: 12.5,
      efficiency: 94.8,
      speed: 1450,
    },
    historicalData: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, "0")}:00`,
        temperature: 68 + Math.random() * 8,
        vibration: 0.2 + Math.random() * 0.4,
        humidity: 40 + Math.random() * 15,
        powerUsage: 10 + Math.random() * 5,
        efficiency: 90 + Math.random() * 10,
        speed: 1400 + Math.random() * 100,
        production: 45 + Math.random() * 15,
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        avgTemperature: 68 + Math.random() * 6,
        avgVibration: 0.25 + Math.random() * 0.3,
        avgHumidity: 42 + Math.random() * 10,
        totalPower: 280 + Math.random() * 50,
        avgEfficiency: 92 + Math.random() * 8,
        totalProduction: 1100 + Math.random() * 200,
        uptime: 85 + Math.random() * 15,
        alerts: Math.floor(Math.random() * 5),
      })),
    },
    performance: {
      uptime: 94.8,
      mtbf: 168,
      mttr: 4.2,
      oee: 87.3,
      totalProduction: 12450,
      energyEfficiency: 92.1,
    },
  },
  {
    id: "M002",
    name: "Assembly Line 1",
    type: "Automated Assembly",
    location: "Production Line A - Station 2",
    status: "online",
    currentMetrics: {
      temperature: 72.1,
      vibration: 0.8,
      humidity: 48.1,
      powerUsage: 28.3,
      efficiency: 96.1,
      speed: 850,
    },
    historicalData: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, "0")}:00`,
        temperature: 70 + Math.random() * 6,
        vibration: 0.6 + Math.random() * 0.4,
        humidity: 45 + Math.random() * 10,
        powerUsage: 25 + Math.random() * 8,
        efficiency: 93 + Math.random() * 7,
        speed: 800 + Math.random() * 100,
        production: 80 + Math.random() * 20,
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        avgTemperature: 71 + Math.random() * 4,
        avgVibration: 0.7 + Math.random() * 0.2,
        avgHumidity: 47 + Math.random() * 6,
        totalPower: 650 + Math.random() * 100,
        avgEfficiency: 94 + Math.random() * 6,
        totalProduction: 1900 + Math.random() * 300,
        uptime: 90 + Math.random() * 10,
        alerts: Math.floor(Math.random() * 3),
      })),
    },
    performance: {
      uptime: 96.2,
      mtbf: 240,
      mttr: 3.8,
      oee: 91.7,
      totalProduction: 18650,
      energyEfficiency: 88.9,
    },
  },
  {
    id: "M003",
    name: "Welding Station B",
    type: "Robotic Welding",
    location: "Production Line B - Station 3",
    status: "warning",
    currentMetrics: {
      temperature: 85.2,
      vibration: 1.2,
      humidity: 52.8,
      powerUsage: 15.8,
      efficiency: 89.3,
      speed: 1200,
    },
    historicalData: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, "0")}:00`,
        temperature: 80 + Math.random() * 12,
        vibration: 0.8 + Math.random() * 0.6,
        humidity: 50 + Math.random() * 8,
        powerUsage: 12 + Math.random() * 8,
        efficiency: 85 + Math.random() * 10,
        speed: 1150 + Math.random() * 100,
        production: 35 + Math.random() * 15,
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        avgTemperature: 82 + Math.random() * 8,
        avgVibration: 1.0 + Math.random() * 0.4,
        avgHumidity: 51 + Math.random() * 6,
        totalPower: 380 + Math.random() * 80,
        avgEfficiency: 87 + Math.random() * 8,
        totalProduction: 850 + Math.random() * 200,
        uptime: 80 + Math.random() * 15,
        alerts: Math.floor(Math.random() * 8),
      })),
    },
    performance: {
      uptime: 89.5,
      mtbf: 120,
      mttr: 6.5,
      oee: 82.1,
      totalProduction: 9280,
      energyEfficiency: 85.4,
    },
  },
  {
    id: "M004",
    name: "Quality Control",
    type: "Inspection System",
    location: "Quality Assurance Lab",
    status: "online",
    currentMetrics: {
      temperature: 70.3,
      vibration: 0.2,
      humidity: 41.5,
      powerUsage: 8.7,
      efficiency: 97.8,
      speed: 600,
    },
    historicalData: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, "0")}:00`,
        temperature: 69 + Math.random() * 4,
        vibration: 0.1 + Math.random() * 0.2,
        humidity: 40 + Math.random() * 6,
        powerUsage: 7 + Math.random() * 3,
        efficiency: 95 + Math.random() * 5,
        speed: 580 + Math.random() * 40,
        production: 120 + Math.random() * 30,
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        avgTemperature: 70 + Math.random() * 3,
        avgVibration: 0.15 + Math.random() * 0.1,
        avgHumidity: 42 + Math.random() * 4,
        totalPower: 200 + Math.random() * 40,
        avgEfficiency: 96 + Math.random() * 4,
        totalProduction: 2800 + Math.random() * 400,
        uptime: 95 + Math.random() * 5,
        alerts: Math.floor(Math.random() * 2),
      })),
    },
    performance: {
      uptime: 97.8,
      mtbf: 360,
      mttr: 2.1,
      oee: 95.2,
      totalProduction: 28960,
      energyEfficiency: 96.7,
    },
  },
  {
    id: "M005",
    name: "Packaging Unit",
    type: "Automated Packaging",
    location: "Production Line A - Station 5",
    status: "error",
    currentMetrics: {
      temperature: 91.8,
      vibration: 2.1,
      humidity: 58.3,
      powerUsage: 0,
      efficiency: 0,
      speed: 0,
    },
    historicalData: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, "0")}:00`,
        temperature: i < 14 ? 85 + Math.random() * 10 : 92 + Math.random() * 5,
        vibration:
          i < 14 ? 1.5 + Math.random() * 0.5 : 2.0 + Math.random() * 0.3,
        humidity: 55 + Math.random() * 8,
        powerUsage: i < 14 ? 18 + Math.random() * 5 : 0,
        efficiency: i < 14 ? 75 + Math.random() * 15 : 0,
        speed: i < 14 ? 900 + Math.random() * 200 : 0,
        production: i < 14 ? 60 + Math.random() * 20 : 0,
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        avgTemperature:
          i > 25 ? 88 + Math.random() * 8 : 78 + Math.random() * 6,
        avgVibration:
          i > 25 ? 1.8 + Math.random() * 0.4 : 1.2 + Math.random() * 0.3,
        avgHumidity: 56 + Math.random() * 6,
        totalPower:
          i > 28 ? 200 + Math.random() * 100 : 450 + Math.random() * 100,
        avgEfficiency:
          i > 28 ? 20 + Math.random() * 30 : 80 + Math.random() * 15,
        totalProduction:
          i > 28 ? 300 + Math.random() * 200 : 1400 + Math.random() * 300,
        uptime: i > 28 ? 40 + Math.random() * 30 : 85 + Math.random() * 10,
        alerts:
          i > 25
            ? Math.floor(Math.random() * 10) + 5
            : Math.floor(Math.random() * 3),
      })),
    },
    performance: {
      uptime: 76.3,
      mtbf: 72,
      mttr: 12.4,
      oee: 68.9,
      totalProduction: 8920,
      energyEfficiency: 74.2,
    },
  },
  {
    id: "M006",
    name: "Material Handler",
    type: "Conveyor System",
    location: "Warehouse Section C",
    status: "online",
    currentMetrics: {
      temperature: 66.8,
      vibration: 0.4,
      humidity: 44.7,
      powerUsage: 6.2,
      efficiency: 93.4,
      speed: 750,
    },
    historicalData: {
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, "0")}:00`,
        temperature: 65 + Math.random() * 6,
        vibration: 0.3 + Math.random() * 0.3,
        humidity: 42 + Math.random() * 8,
        powerUsage: 5 + Math.random() * 3,
        efficiency: 90 + Math.random() * 8,
        speed: 720 + Math.random() * 60,
        production: 200 + Math.random() * 50,
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        avgTemperature: 67 + Math.random() * 4,
        avgVibration: 0.35 + Math.random() * 0.2,
        avgHumidity: 44 + Math.random() * 6,
        totalPower: 150 + Math.random() * 30,
        avgEfficiency: 92 + Math.random() * 6,
        totalProduction: 5200 + Math.random() * 800,
        uptime: 92 + Math.random() * 8,
        alerts: Math.floor(Math.random() * 3),
      })),
    },
    performance: {
      uptime: 93.7,
      mtbf: 200,
      mttr: 3.2,
      oee: 89.1,
      totalProduction: 52400,
      energyEfficiency: 91.8,
    },
  },
];

export function Analytics() {
  const [selectedMachine, setSelectedMachine] = useState<MachineData>(
    machinesData[0],
  );
  const [timeRange, setTimeRange] = useState<"hourly" | "daily">("hourly");
  const [selectedMetric, setSelectedMetric] = useState<
    | "temperature"
    | "vibration"
    | "humidity"
    | "powerUsage"
    | "efficiency"
    | "production"
  >("temperature");

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMachine((prev) => ({
        ...prev,
        currentMetrics: {
          ...prev.currentMetrics,
          temperature:
            prev.currentMetrics.temperature + (Math.random() - 0.5) * 2,
          vibration: Math.max(
            0,
            prev.currentMetrics.vibration + (Math.random() - 0.5) * 0.1,
          ),
          humidity: prev.currentMetrics.humidity + (Math.random() - 0.5) * 2,
          powerUsage:
            prev.status === "error"
              ? 0
              : Math.max(
                  0,
                  prev.currentMetrics.powerUsage + (Math.random() - 0.5) * 1,
                ),
          efficiency:
            prev.status === "error"
              ? 0
              : Math.max(
                  0,
                  Math.min(
                    100,
                    prev.currentMetrics.efficiency + (Math.random() - 0.5) * 2,
                  ),
                ),
          speed:
            prev.status === "error"
              ? 0
              : Math.max(
                  0,
                  prev.currentMetrics.speed + (Math.random() - 0.5) * 20,
                ),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-iot-success";
      case "warning":
        return "text-iot-warning";
      case "error":
        return "text-iot-error";
      default:
        return "text-iot-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "error":
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case "temperature":
        return value > 80
          ? "text-iot-error"
          : value > 70
            ? "text-iot-warning"
            : "text-iot-blue-500";
      case "vibration":
        return value > 1.5
          ? "text-iot-error"
          : value > 1.0
            ? "text-iot-warning"
            : "text-iot-success";
      case "humidity":
        return "text-iot-blue-500";
      case "powerUsage":
        return "text-iot-orange-500";
      case "efficiency":
        return value < 80
          ? "text-iot-error"
          : value < 90
            ? "text-iot-warning"
            : "text-iot-success";
      default:
        return "text-foreground";
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "temperature":
        return Thermometer;
      case "vibration":
        return Activity;
      case "humidity":
        return Droplets;
      case "powerUsage":
        return Zap;
      case "efficiency":
        return Target;
      default:
        return BarChart3;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}
              {entry.dataKey === "temperature" ? "°C" : ""}
              {entry.dataKey === "vibration" ? " mm/s" : ""}
              {entry.dataKey === "humidity" ? "%" : ""}
              {entry.dataKey === "powerUsage" || entry.dataKey === "totalPower"
                ? " kW"
                : ""}
              {entry.dataKey === "efficiency" ||
              entry.dataKey === "avgEfficiency"
                ? "%"
                : ""}
              {entry.dataKey === "production" ||
              entry.dataKey === "totalProduction"
                ? " units"
                : ""}
              {entry.dataKey === "uptime" ? "%" : ""}
              {entry.dataKey === "speed" ? " RPM" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentData =
    timeRange === "hourly"
      ? selectedMachine.historicalData.hourly
      : selectedMachine.historicalData.daily;
  const StatusIcon = getStatusIcon(selectedMachine.status);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Machine Analytics
          </h1>
          <p className="text-muted-foreground">
            Detailed analysis and performance metrics for manufacturing
            equipment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export Data</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Machine Selector */}
      <div className="metric-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Select Machine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {machinesData.map((machine) => (
            <button
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                selectedMachine.id === machine.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:bg-accent"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">{machine.name}</h3>
                <StatusIcon
                  className={`w-4 h-4 ${getStatusColor(machine.status)}`}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {machine.type}
              </p>
              <p className="text-xs text-muted-foreground">{machine.id}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Machine Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Machine Info */}
        <div className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Machine Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">
                {selectedMachine.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">
                {selectedMachine.type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="font-medium text-foreground">
                {selectedMachine.location}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className="flex items-center gap-2">
                <StatusIcon
                  className={`w-4 h-4 ${getStatusColor(selectedMachine.status)}`}
                />
                <span
                  className={`font-medium capitalize ${getStatusColor(selectedMachine.status)}`}
                >
                  {selectedMachine.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="lg:col-span-2">
          <div className="metric-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Real-time Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(selectedMachine.currentMetrics).map(
                ([key, value]) => {
                  const Icon = getMetricIcon(key);
                  let unit = "";
                  let displayValue = value;

                  switch (key) {
                    case "temperature":
                      unit = "°C";
                      break;
                    case "vibration":
                      unit = " mm/s";
                      break;
                    case "humidity":
                    case "efficiency":
                      unit = "%";
                      break;
                    case "powerUsage":
                      unit = " kW";
                      break;
                    case "speed":
                      unit = " RPM";
                      break;
                  }

                  return (
                    <div key={key} className="bg-accent/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon
                          className={`w-4 h-4 ${getMetricColor(key, value)}`}
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                      </div>
                      <p
                        className={`text-xl font-bold ${getMetricColor(key, value)}`}
                      >
                        {typeof displayValue === "number"
                          ? displayValue.toFixed(1)
                          : displayValue}
                        {unit}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance KPIs */}
      <div className="metric-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Performance KPIs
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {Object.entries(selectedMachine.performance).map(([key, value]) => {
            let unit = "";
            let color = "text-foreground";

            switch (key) {
              case "uptime":
              case "oee":
              case "energyEfficiency":
                unit = "%";
                color =
                  value > 90
                    ? "text-iot-success"
                    : value > 80
                      ? "text-iot-warning"
                      : "text-iot-error";
                break;
              case "mtbf":
                unit = " hrs";
                color =
                  value > 200
                    ? "text-iot-success"
                    : value > 100
                      ? "text-iot-warning"
                      : "text-iot-error";
                break;
              case "mttr":
                unit = " hrs";
                color =
                  value < 3
                    ? "text-iot-success"
                    : value < 6
                      ? "text-iot-warning"
                      : "text-iot-error";
                break;
              case "totalProduction":
                unit = " units";
                color = "text-iot-blue-500";
                break;
            }

            return (
              <div key={key} className="text-center">
                <p className={`text-2xl font-bold ${color}`}>
                  {typeof value === "number"
                    ? key === "totalProduction"
                      ? value.toLocaleString()
                      : value.toFixed(1)
                    : value}
                  {unit}
                </p>
                <p className="text-sm text-muted-foreground capitalize mt-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Range and Metric Selector */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="hourly">Last 24 Hours</option>
            <option value="daily">Last 30 Days</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="temperature">Temperature</option>
            <option value="vibration">Vibration</option>
            <option value="humidity">Humidity</option>
            <option value="powerUsage">Power Usage</option>
            <option value="efficiency">Efficiency</option>
            <option value="production">Production</option>
          </select>
        </div>
      </div>

      {/* Historical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Metric Chart */}
        <div className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {selectedMetric.charAt(0).toUpperCase() +
              selectedMetric.slice(1).replace(/([A-Z])/g, " $1")}{" "}
            Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey={timeRange === "hourly" ? "time" : "date"}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={
                  timeRange === "hourly"
                    ? selectedMetric
                    : selectedMetric === "powerUsage"
                      ? "totalPower"
                      : selectedMetric === "efficiency"
                        ? "avgEfficiency"
                        : selectedMetric === "production"
                          ? "totalProduction"
                          : `avg${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`
                }
                stroke="hsl(var(--iot-blue-500))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--iot-blue-500))", strokeWidth: 2, r: 3 }}
                name={
                  selectedMetric.charAt(0).toUpperCase() +
                  selectedMetric.slice(1)
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Multi-Metric Chart */}
        <div className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Multi-Metric Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey={timeRange === "hourly" ? "time" : "date"}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={
                  timeRange === "hourly" ? "efficiency" : "avgEfficiency"
                }
                stroke="hsl(var(--iot-success))"
                strokeWidth={2}
                dot={false}
                name="Efficiency"
              />
              <Line
                type="monotone"
                dataKey={
                  timeRange === "hourly" ? "temperature" : "avgTemperature"
                }
                stroke="hsl(var(--iot-orange-500))"
                strokeWidth={2}
                dot={false}
                name="Temperature"
              />
              <Line
                type="monotone"
                dataKey={timeRange === "hourly" ? "vibration" : "avgVibration"}
                stroke="hsl(var(--iot-error))"
                strokeWidth={2}
                dot={false}
                name="Vibration"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Production vs Efficiency */}
        <div className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Production vs Efficiency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={currentData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                type="number"
                dataKey={
                  timeRange === "hourly" ? "efficiency" : "avgEfficiency"
                }
                domain={[70, 100]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                name="Efficiency (%)"
              />
              <YAxis
                type="number"
                dataKey={
                  timeRange === "hourly" ? "production" : "totalProduction"
                }
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                name="Production"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                dataKey={
                  timeRange === "hourly" ? "production" : "totalProduction"
                }
                fill="hsl(var(--iot-blue-500))"
                name="Production vs Efficiency"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Trend */}
        {timeRange === "daily" && (
          <div className="metric-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Alert Frequency
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedMachine.historicalData.daily}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="alerts"
                  fill="hsl(var(--iot-warning))"
                  name="Daily Alerts"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
