import React, { useEffect, useState } from "react";
import {
  Thermometer,
  Zap,
  Droplets,
  Fan,
  Power,
  AlertTriangle,
  Gauge,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { DeviceControl } from "../components/DeviceControl";
import { AlertsModule } from "../components/AlertsModule";
import { AnalyticsPanel } from "../components/AnalyticsPanel";
import { DeviceStatusSection } from "../components/DeviceStatusSection";

interface MachineData {
  id: string;
  name: string;
  status: "online" | "offline" | "warning" | "error";
  temperature: number;
  vibration: number;
  humidity: number;
  powerUsage: number;
  uptime: string;
  lastMaintenance: string;
}

interface SystemMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function Overview() {
  const [machines, setMachines] = useState<MachineData[]>([
    {
      id: "M001",
      name: "CNC Machine A1",
      status: "online",
      temperature: 68.5,
      vibration: 0.3,
      humidity: 45.2,
      powerUsage: 12.5,
      uptime: "14d 6h 23m",
      lastMaintenance: "2024-01-15",
    },
    {
      id: "M002",
      name: "Assembly Line 1",
      status: "online",
      temperature: 72.1,
      vibration: 0.8,
      humidity: 48.1,
      powerUsage: 28.3,
      uptime: "12d 14h 45m",
      lastMaintenance: "2024-01-12",
    },
    {
      id: "M003",
      name: "Welding Station B",
      status: "warning",
      temperature: 85.2,
      vibration: 1.2,
      humidity: 52.8,
      powerUsage: 15.8,
      uptime: "8d 2h 17m",
      lastMaintenance: "2024-01-18",
    },
    {
      id: "M004",
      name: "Quality Control",
      status: "online",
      temperature: 70.3,
      vibration: 0.2,
      humidity: 41.5,
      powerUsage: 8.7,
      uptime: "22d 18h 12m",
      lastMaintenance: "2024-01-08",
    },
    {
      id: "M005",
      name: "Packaging Unit",
      status: "error",
      temperature: 91.8,
      vibration: 2.1,
      humidity: 58.3,
      powerUsage: 0,
      uptime: "0d 0h 0m",
      lastMaintenance: "2024-01-20",
    },
    {
      id: "M006",
      name: "Material Handler",
      status: "online",
      temperature: 66.8,
      vibration: 0.4,
      humidity: 44.7,
      powerUsage: 6.2,
      uptime: "16d 8h 33m",
      lastMaintenance: "2024-01-14",
    },
  ]);

  const [systemMetrics] = useState<SystemMetric[]>([
    {
      label: "Total Production",
      value: "1,247 units",
      change: 12.5,
      icon: Activity,
      color: "text-iot-blue-500",
    },
    {
      label: "Power Consumption",
      value: "71.5 kW",
      change: -5.2,
      icon: Zap,
      color: "text-iot-orange-500",
    },
    {
      label: "Overall Efficiency",
      value: "94.8%",
      change: 2.1,
      icon: Gauge,
      color: "text-iot-success",
    },
    {
      label: "Active Alerts",
      value: "3",
      change: -1,
      icon: AlertTriangle,
      color: "text-iot-warning",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prev) =>
        prev.map((machine) => ({
          ...machine,
          temperature: machine.temperature + (Math.random() - 0.5) * 2,
          vibration: Math.max(
            0,
            machine.vibration + (Math.random() - 0.5) * 0.2,
          ),
          humidity: machine.humidity + (Math.random() - 0.5) * 3,
          powerUsage:
            machine.status === "error"
              ? 0
              : Math.max(0, machine.powerUsage + (Math.random() - 0.5) * 2),
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "status-online";
      case "warning":
        return "status-warning";
      case "error":
        return "status-error";
      default:
        return "status-offline";
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 80) return "text-iot-error";
    if (temp > 75) return "text-iot-warning";
    return "text-iot-blue-500";
  };

  const getVibrationColor = (vibration: number) => {
    if (vibration > 1.5) return "text-iot-error";
    if (vibration > 1.0) return "text-iot-warning";
    return "text-iot-success";
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Manufacturing Overview
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and control dashboard
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.change > 0;
          const ChangeIcon = isPositive ? TrendingUp : TrendingDown;

          return (
            <div key={index} className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <div
                  className={`flex items-center gap-1 text-xs ${
                    isPositive ? "text-iot-success" : "text-iot-error"
                  }`}
                >
                  <ChangeIcon className="w-3 h-3" />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Device Status Section */}
      <DeviceStatusSection />

      {/* Machine Status Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Machine Status
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {machines.map((machine) => (
            <div key={machine.id} className="metric-card">
              {/* Machine Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`status-indicator ${getStatusColor(machine.status)}`}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {machine.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {machine.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {machine.status === "online" && (
                    <Power className="w-4 h-4 text-iot-success" />
                  )}
                  {machine.status === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-iot-warning" />
                  )}
                  {machine.status === "error" && (
                    <AlertTriangle className="w-4 h-4 text-iot-error" />
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer
                      className={`w-4 h-4 ${getTemperatureColor(machine.temperature)}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      Temperature
                    </span>
                  </div>
                  <span
                    className={`font-medium ${getTemperatureColor(machine.temperature)}`}
                  >
                    {machine.temperature.toFixed(1)}°F
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity
                      className={`w-4 h-4 ${getVibrationColor(machine.vibration)}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      Vibration
                    </span>
                  </div>
                  <span
                    className={`font-medium ${getVibrationColor(machine.vibration)}`}
                  >
                    {machine.vibration.toFixed(1)} mm/s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-iot-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      Humidity
                    </span>
                  </div>
                  <span className="font-medium text-iot-blue-500">
                    {machine.humidity.toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-iot-orange-500" />
                    <span className="text-sm text-muted-foreground">Power</span>
                  </div>
                  <span className="font-medium text-iot-orange-500">
                    {machine.powerUsage.toFixed(1)} kW
                  </span>
                </div>
              </div>

              {/* Status Info */}
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="text-foreground">{machine.uptime}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Last Maintenance
                  </span>
                  <span className="text-foreground">
                    {machine.lastMaintenance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Control Section */}
      <DeviceControl />

      {/* Alerts Section */}
      <AlertsModule />

      {/* Analytics Section */}
      <AnalyticsPanel />
    </div>
  );
}
