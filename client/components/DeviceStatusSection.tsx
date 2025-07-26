import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Thermometer,
  Clock,
  AlertTriangle,
  CheckCircle,
  Power,
  Zap,
  Activity,
  ArrowRight,
  ExternalLink,
  Wrench,
} from "lucide-react";

interface DeviceStatus {
  id: string;
  name: string;
  status: "online" | "offline" | "warning" | "error" | "maintenance";
  temperature: number;
  runtime: {
    todayHours: number;
    uptime: number;
  };
  faults: Array<{
    id: string;
    type: string;
    severity: "low" | "medium" | "high" | "critical";
    message: string;
  }>;
  powerUsage: number;
  location: string;
}

export function DeviceStatusSection() {
  const [devices, setDevices] = useState<DeviceStatus[]>([
    {
      id: "M001",
      name: "CNC Machine A1",
      status: "online",
      temperature: 68.5,
      runtime: {
        todayHours: 8.5,
        uptime: 94.8,
      },
      faults: [],
      powerUsage: 12.5,
      location: "Production Line A",
    },
    {
      id: "M002",
      name: "Assembly Line 1",
      status: "online",
      temperature: 72.1,
      runtime: {
        todayHours: 9.2,
        uptime: 96.1,
      },
      faults: [],
      powerUsage: 28.3,
      location: "Production Line A",
    },
    {
      id: "M003",
      name: "Welding Station B",
      status: "warning",
      temperature: 85.2,
      runtime: {
        todayHours: 6.8,
        uptime: 89.3,
      },
      faults: [
        {
          id: "F001",
          type: "High Temperature",
          severity: "high",
          message: "Temperature exceeded safe operating range",
        },
        {
          id: "F002",
          type: "Vibration Alert",
          severity: "medium",
          message: "Elevated vibration levels detected",
        },
      ],
      powerUsage: 15.8,
      location: "Production Line B",
    },
    {
      id: "M004",
      name: "Quality Control",
      status: "online",
      temperature: 70.3,
      runtime: {
        todayHours: 7.9,
        uptime: 97.8,
      },
      faults: [],
      powerUsage: 8.7,
      location: "QA Lab",
    },
    {
      id: "M005",
      name: "Packaging Unit",
      status: "error",
      temperature: 91.8,
      runtime: {
        todayHours: 0,
        uptime: 76.3,
      },
      faults: [
        {
          id: "F003",
          type: "Motor Failure",
          severity: "critical",
          message: "Main drive motor has failed",
        },
        {
          id: "F004",
          type: "Emergency Stop",
          severity: "critical",
          message: "Emergency stop activated",
        },
      ],
      powerUsage: 0,
      location: "Production Line A",
    },
    {
      id: "M006",
      name: "Material Handler",
      status: "online",
      temperature: 66.8,
      runtime: {
        todayHours: 8.1,
        uptime: 93.4,
      },
      faults: [
        {
          id: "F005",
          type: "Belt Alignment",
          severity: "low",
          message: "Minor belt misalignment detected",
        },
      ],
      powerUsage: 6.2,
      location: "Warehouse C",
    },
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          temperature:
            device.status === "error"
              ? device.temperature
              : device.temperature + (Math.random() - 0.5) * 2,
          powerUsage:
            device.status === "error"
              ? 0
              : Math.max(0, device.powerUsage + (Math.random() - 0.5) * 1),
          runtime: {
            ...device.runtime,
            todayHours:
              device.status === "error"
                ? device.runtime.todayHours
                : device.runtime.todayHours + Math.random() * 0.1,
          },
        })),
      );
    }, 4000);

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
      case "offline":
        return "text-iot-gray-500";
      case "maintenance":
        return "text-iot-blue-500";
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
      case "offline":
        return Power;
      case "maintenance":
        return Wrench;
      default:
        return Activity;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 85) return "text-iot-error";
    if (temp > 75) return "text-iot-warning";
    return "text-iot-blue-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-iot-error";
      case "high":
        return "text-iot-orange-500";
      case "medium":
        return "text-iot-warning";
      case "low":
        return "text-iot-blue-500";
      default:
        return "text-iot-gray-500";
    }
  };

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const warningCount = devices.filter((d) => d.status === "warning").length;
  const errorCount = devices.filter((d) => d.status === "error").length;
  const totalFaults = devices.reduce((sum, d) => sum + d.faults.length, 0);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Device Status Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring of all manufacturing equipment
          </p>
        </div>
        <Link
          to="/devices"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span className="text-sm">View All Devices</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-4 h-4 text-iot-success" />
          </div>
          <p className="text-2xl font-bold text-iot-success">{onlineCount}</p>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-4 h-4 text-iot-warning" />
          </div>
          <p className="text-2xl font-bold text-iot-warning">{warningCount}</p>
          <p className="text-sm text-muted-foreground">Warnings</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-error/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-4 h-4 text-iot-error" />
          </div>
          <p className="text-2xl font-bold text-iot-error">{errorCount}</p>
          <p className="text-sm text-muted-foreground">Errors</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-4 h-4 text-iot-orange-500" />
          </div>
          <p className="text-2xl font-bold text-iot-orange-500">
            {totalFaults}
          </p>
          <p className="text-sm text-muted-foreground">Total Faults</p>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => {
          const StatusIcon = getStatusIcon(device.status);

          return (
            <div key={device.id} className="metric-card">
              {/* Device Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      device.status === "online"
                        ? "bg-iot-success/20"
                        : device.status === "warning"
                          ? "bg-iot-warning/20"
                          : device.status === "error"
                            ? "bg-iot-error/20"
                            : "bg-iot-gray-500/20"
                    }`}
                  >
                    <StatusIcon
                      className={`w-4 h-4 ${getStatusColor(device.status)}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {device.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{device.id}</p>
                  </div>
                </div>
                <Link to={`/devices`} className="p-1 hover:bg-accent rounded">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Thermometer
                      className={`w-3 h-3 ${getTemperatureColor(device.temperature)}`}
                    />
                    <span className="text-xs text-muted-foreground">Temp</span>
                  </div>
                  <p
                    className={`text-sm font-bold ${getTemperatureColor(device.temperature)}`}
                  >
                    {device.temperature.toFixed(1)}°C
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-iot-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      Runtime
                    </span>
                  </div>
                  <p className="text-sm font-bold text-iot-blue-500">
                    {device.runtime.todayHours.toFixed(1)}h
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-3 h-3 text-iot-orange-500" />
                    <span className="text-xs text-muted-foreground">Power</span>
                  </div>
                  <p className="text-sm font-bold text-iot-orange-500">
                    {device.powerUsage.toFixed(1)}kW
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="text-foreground">
                    {device.runtime.uptime.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">{device.location}</span>
                </div>
              </div>

              {/* Faults */}
              {device.faults.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">
                      Active Faults ({device.faults.length})
                    </span>
                  </div>
                  <div className="space-y-1">
                    {device.faults.slice(0, 2).map((fault) => (
                      <div
                        key={fault.id}
                        className="p-2 bg-iot-error/5 border border-iot-error/10 rounded text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-medium ${getSeverityColor(fault.severity)}`}
                          >
                            {fault.type}
                          </span>
                          <span
                            className={`px-1 py-0.5 rounded text-xs ${
                              fault.severity === "critical"
                                ? "bg-iot-error text-white"
                                : fault.severity === "high"
                                  ? "bg-iot-orange-500 text-white"
                                  : fault.severity === "medium"
                                    ? "bg-iot-warning text-black"
                                    : "bg-iot-blue-500 text-white"
                            }`}
                          >
                            {fault.severity}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-1">
                          {fault.message}
                        </p>
                      </div>
                    ))}
                    {device.faults.length > 2 && (
                      <p className="text-xs text-iot-blue-500">
                        +{device.faults.length - 2} more faults
                      </p>
                    )}
                  </div>
                </div>
              )}

              {device.faults.length === 0 && (
                <div className="flex items-center gap-2 p-2 bg-iot-success/10 border border-iot-success/20 rounded">
                  <CheckCircle className="w-4 h-4 text-iot-success" />
                  <span className="text-xs text-iot-success font-medium">
                    No active faults
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
