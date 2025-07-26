import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  X,
  Settings,
  Filter,
  Bell,
  Search,
  Download,
  RefreshCw,
  Zap,
  Thermometer,
  Activity,
  Power,
  Wrench,
  ExternalLink,
} from "lucide-react";

interface MachineAlert {
  id: string;
  type: "critical" | "warning" | "maintenance" | "info";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  machineId: string;
  machineName: string;
  location: string;
  timestamp: Date;
  acknowledged: boolean;
  resolved: boolean;
  assignedTo?: string;
  failureType: string;
  impactLevel:
    | "production_stopped"
    | "performance_degraded"
    | "monitoring_only";
  estimatedDowntime?: string;
  repairCost?: number;
  parameters: {
    temperature?: number;
    vibration?: number;
    pressure?: number;
    voltage?: number;
  };
}

export function Alerts() {
  const [alerts, setAlerts] = useState<MachineAlert[]>([
    {
      id: "FAIL001",
      type: "critical",
      severity: "high",
      title: "Motor Overheating Failure",
      description:
        "Main drive motor temperature has exceeded critical threshold (95°C). Automatic shutdown initiated to prevent damage.",
      machineId: "M005",
      machineName: "Packaging Unit",
      location: "Production Line A - Station 5",
      timestamp: new Date("2024-01-21T14:30:00"),
      acknowledged: false,
      resolved: false,
      failureType: "Thermal Overload",
      impactLevel: "production_stopped",
      estimatedDowntime: "4-6 hours",
      repairCost: 2500,
      parameters: {
        temperature: 95.2,
        voltage: 0,
      },
    },
    {
      id: "FAIL002",
      type: "critical",
      severity: "high",
      title: "Hydraulic System Pressure Drop",
      description:
        "Critical pressure loss detected in hydraulic system. Pressure dropped from 2000 PSI to 850 PSI within 5 minutes.",
      machineId: "M003",
      machineName: "Welding Station B",
      location: "Production Line B - Station 3",
      timestamp: new Date("2024-01-21T13:45:00"),
      acknowledged: true,
      resolved: false,
      assignedTo: "Tech Team Alpha",
      failureType: "Hydraulic Leak",
      impactLevel: "production_stopped",
      estimatedDowntime: "2-3 hours",
      repairCost: 1800,
      parameters: {
        pressure: 850,
        temperature: 78.5,
      },
    },
    {
      id: "FAIL003",
      type: "warning",
      severity: "medium",
      title: "Excessive Vibration Detected",
      description:
        "Vibration levels consistently above normal operating range. Bearing wear suspected.",
      machineId: "M001",
      machineName: "CNC Machine A1",
      location: "Production Line A - Station 1",
      timestamp: new Date("2024-01-21T12:15:00"),
      acknowledged: true,
      resolved: false,
      assignedTo: "Maintenance Team B",
      failureType: "Mechanical Wear",
      impactLevel: "performance_degraded",
      estimatedDowntime: "1-2 hours",
      repairCost: 650,
      parameters: {
        vibration: 1.8,
        temperature: 72.1,
      },
    },
    {
      id: "FAIL004",
      type: "critical",
      severity: "high",
      title: "Power Supply Failure",
      description:
        "Main power supply unit has failed. Backup power engaged but limited capacity available.",
      machineId: "M002",
      machineName: "Assembly Line 1",
      location: "Production Line A - Station 2",
      timestamp: new Date("2024-01-21T11:30:00"),
      acknowledged: true,
      resolved: true,
      assignedTo: "Electrical Team",
      failureType: "Electrical Failure",
      impactLevel: "performance_degraded",
      estimatedDowntime: "3-4 hours",
      repairCost: 3200,
      parameters: {
        voltage: 180,
        temperature: 45.2,
      },
    },
    {
      id: "FAIL005",
      type: "warning",
      severity: "medium",
      title: "Conveyor Belt Misalignment",
      description:
        "Belt tracking sensors indicate significant misalignment. Production efficiency reduced by 15%.",
      machineId: "M006",
      machineName: "Material Handler",
      location: "Warehouse Section C",
      timestamp: new Date("2024-01-21T10:45:00"),
      acknowledged: true,
      resolved: false,
      assignedTo: "Maintenance Team A",
      failureType: "Mechanical Alignment",
      impactLevel: "performance_degraded",
      estimatedDowntime: "30-60 minutes",
      repairCost: 200,
      parameters: {
        temperature: 68.3,
      },
    },
    {
      id: "FAIL006",
      type: "maintenance",
      severity: "medium",
      title: "Scheduled Maintenance Overdue",
      description:
        "Critical maintenance window missed. Immediate service required to prevent potential failures.",
      machineId: "M004",
      machineName: "Quality Control",
      location: "Quality Assurance Lab",
      timestamp: new Date("2024-01-21T09:00:00"),
      acknowledged: true,
      resolved: false,
      assignedTo: "Maintenance Team B",
      failureType: "Preventive Maintenance",
      impactLevel: "monitoring_only",
      estimatedDowntime: "2-3 hours",
      repairCost: 450,
      parameters: {
        temperature: 70.8,
      },
    },
  ]);

  const [filter, setFilter] = useState<
    "all" | "critical" | "warning" | "maintenance" | "unresolved"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate real-time alert updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update some parameters to simulate real-time monitoring
      setAlerts((prev) =>
        prev.map((alert) => ({
          ...alert,
          parameters: {
            ...alert.parameters,
            temperature: alert.parameters.temperature
              ? alert.parameters.temperature + (Math.random() - 0.5) * 2
              : undefined,
            vibration: alert.parameters.vibration
              ? Math.max(
                  0,
                  alert.parameters.vibration + (Math.random() - 0.5) * 0.1,
                )
              : undefined,
            pressure: alert.parameters.pressure
              ? Math.max(
                  0,
                  alert.parameters.pressure + (Math.random() - 0.5) * 50,
                )
              : undefined,
            voltage: alert.parameters.voltage
              ? Math.max(
                  0,
                  alert.parameters.voltage + (Math.random() - 0.5) * 10,
                )
              : undefined,
          },
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert,
      ),
    );
  };

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, resolved: true } : alert,
      ),
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return AlertCircle;
      case "maintenance":
        return Wrench;
      case "info":
        return Info;
      default:
        return AlertCircle;
    }
  };

  const getFailureTypeIcon = (failureType: string) => {
    switch (failureType) {
      case "Thermal Overload":
        return Thermometer;
      case "Hydraulic Leak":
        return Activity;
      case "Mechanical Wear":
        return Activity;
      case "Electrical Failure":
        return Zap;
      case "Mechanical Alignment":
        return Settings;
      case "Preventive Maintenance":
        return Wrench;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (type: string, resolved: boolean) => {
    if (resolved)
      return "text-iot-gray-500 bg-iot-gray-500/5 border-iot-gray-500/20";

    switch (type) {
      case "critical":
        return "text-iot-error bg-iot-error/10 border-iot-error/20";
      case "warning":
        return "text-iot-warning bg-iot-warning/10 border-iot-warning/20";
      case "maintenance":
        return "text-iot-blue-500 bg-iot-blue-500/10 border-iot-blue-500/20";
      case "info":
        return "text-iot-gray-400 bg-iot-gray-400/10 border-iot-gray-400/20";
      default:
        return "text-iot-gray-400 bg-iot-gray-400/10 border-iot-gray-400/20";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-iot-error text-white";
      case "medium":
        return "bg-iot-warning text-white";
      case "low":
        return "bg-iot-blue-500 text-white";
      default:
        return "bg-iot-gray-500 text-white";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "production_stopped":
        return "text-iot-error";
      case "performance_degraded":
        return "text-iot-warning";
      case "monitoring_only":
        return "text-iot-blue-500";
      default:
        return "text-iot-gray-500";
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case "production_stopped":
        return "Production Stopped";
      case "performance_degraded":
        return "Performance Degraded";
      case "monitoring_only":
        return "Monitoring Only";
      default:
        return "Unknown Impact";
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unresolved" && !alert.resolved) ||
      alert.type === filter;

    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.failureType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.machineId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const criticalCount = alerts.filter(
    (alert) => alert.type === "critical" && !alert.resolved,
  ).length;
  const unresolvedCount = alerts.filter((alert) => !alert.resolved).length;
  const totalDowntime = alerts
    .filter((alert) => !alert.resolved && alert.estimatedDowntime)
    .reduce(
      (total, alert) =>
        total + parseFloat(alert.estimatedDowntime!.split("-")[0]),
      0,
    );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) {
      return `${minutes} min ago`;
    } else {
      return `${hours} hr ago`;
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Machine Failure Alerts
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all manufacturing equipment failures
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card border-iot-error/20">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-5 h-5 text-iot-error" />
            <span className="text-xs text-iot-error font-medium">Critical</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-iot-error">{criticalCount}</p>
            <p className="text-sm text-muted-foreground">
              Active Critical Alerts
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-5 h-5 text-iot-warning" />
            <span className="text-xs text-iot-warning font-medium">
              Pending
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {unresolvedCount}
            </p>
            <p className="text-sm text-muted-foreground">Unresolved Issues</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-iot-orange-500" />
            <span className="text-xs text-iot-orange-500 font-medium">
              Downtime
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {totalDowntime}h
            </p>
            <p className="text-sm text-muted-foreground">Est. Total Downtime</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-5 h-5 text-iot-blue-500" />
            <span className="text-xs text-iot-blue-500 font-medium">Cost</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              $
              {alerts
                .filter((a) => !a.resolved && a.repairCost)
                .reduce((sum, a) => sum + (a.repairCost || 0), 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Est. Repair Costs</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search alerts by machine, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Alerts</option>
            <option value="unresolved">Unresolved</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="metric-card text-center py-8">
            <CheckCircle className="w-12 h-12 text-iot-success mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No alerts found
            </h3>
            <p className="text-muted-foreground">
              {filter === "all"
                ? "All systems are operating normally"
                : `No ${filter} alerts match your search`}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const FailureIcon = getFailureTypeIcon(alert.failureType);

            return (
              <div
                key={alert.id}
                className={`metric-card border ${getAlertColor(alert.type, alert.resolved)} ${
                  alert.resolved ? "opacity-60" : ""
                }`}
              >
                <div className="space-y-4">
                  {/* Alert Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground text-lg">
                                {alert.title}
                              </h3>
                              <div
                                className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}
                              >
                                {alert.severity.toUpperCase()}
                              </div>
                              {alert.resolved && (
                                <div className="px-2 py-1 bg-iot-success text-white rounded text-xs font-medium">
                                  RESOLVED
                                </div>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-2">
                              {alert.description}
                            </p>
                          </div>
                        </div>

                        {/* Machine Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/30 rounded-lg">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                              Machine
                            </p>
                            <p className="font-medium text-foreground">
                              {alert.machineName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {alert.machineId}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                              Location
                            </p>
                            <p className="font-medium text-foreground">
                              {alert.location}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                              Failure Type
                            </p>
                            <div className="flex items-center gap-2">
                              <FailureIcon className="w-4 h-4" />
                              <p className="font-medium text-foreground">
                                {alert.failureType}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Impact and Parameters */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Impact Level
                              </span>
                              <span
                                className={`font-medium ${getImpactColor(alert.impactLevel)}`}
                              >
                                {getImpactText(alert.impactLevel)}
                              </span>
                            </div>
                            {alert.estimatedDowntime && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Est. Downtime
                                </span>
                                <span className="font-medium text-iot-warning">
                                  {alert.estimatedDowntime}
                                </span>
                              </div>
                            )}
                            {alert.repairCost && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Est. Repair Cost
                                </span>
                                <span className="font-medium text-iot-orange-500">
                                  ${alert.repairCost.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {alert.assignedTo && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Assigned To
                                </span>
                                <span className="font-medium text-iot-blue-500">
                                  {alert.assignedTo}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Live Parameters */}
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-foreground">
                              Live Parameters
                            </p>
                            {Object.entries(alert.parameters).map(
                              ([key, value]) => {
                                if (value === undefined) return null;

                                let unit = "";
                                let color = "text-foreground";

                                switch (key) {
                                  case "temperature":
                                    unit = "°C";
                                    color =
                                      value > 80
                                        ? "text-iot-error"
                                        : value > 70
                                          ? "text-iot-warning"
                                          : "text-iot-blue-500";
                                    break;
                                  case "vibration":
                                    unit = " mm/s";
                                    color =
                                      value > 1.5
                                        ? "text-iot-error"
                                        : value > 1.0
                                          ? "text-iot-warning"
                                          : "text-iot-success";
                                    break;
                                  case "pressure":
                                    unit = " PSI";
                                    color =
                                      value < 1000
                                        ? "text-iot-error"
                                        : value < 1500
                                          ? "text-iot-warning"
                                          : "text-iot-success";
                                    break;
                                  case "voltage":
                                    unit = "V";
                                    color =
                                      value < 100
                                        ? "text-iot-error"
                                        : value < 200
                                          ? "text-iot-warning"
                                          : "text-iot-success";
                                    break;
                                }

                                return (
                                  <div
                                    key={key}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="text-sm text-muted-foreground capitalize">
                                      {key}
                                    </span>
                                    <span className={`font-medium ${color}`}>
                                      {typeof value === "number"
                                        ? value.toFixed(1)
                                        : value}
                                      {unit}
                                    </span>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Acknowledge
                        </button>
                      )}
                      {!alert.resolved && (
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="px-3 py-1 bg-iot-success text-white rounded-lg text-sm font-medium hover:bg-iot-success/90 transition-colors"
                        >
                          Mark Resolved
                        </button>
                      )}
                      <button className="px-3 py-1 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>Alert ID: {alert.id}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(alert.timestamp)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.acknowledged && (
                        <span className="text-iot-success">✓ Acknowledged</span>
                      )}
                      {alert.resolved && (
                        <span className="text-iot-success">✓ Resolved</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
