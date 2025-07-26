import React, { useState } from "react";
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
} from "lucide-react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "maintenance";
  title: string;
  message: string;
  machineId: string;
  machineName: string;
  timestamp: Date;
  acknowledged: boolean;
  priority: "high" | "medium" | "low";
}

export function AlertsModule() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "ALT001",
      type: "critical",
      title: "High Temperature Alert",
      message: "Temperature has exceeded safe operating limits (>90°F)",
      machineId: "M005",
      machineName: "Packaging Unit",
      timestamp: new Date("2024-01-21T14:30:00"),
      acknowledged: false,
      priority: "high",
    },
    {
      id: "ALT002",
      type: "warning",
      title: "Elevated Vibration Detected",
      message: "Vibration levels are above normal range (1.2 mm/s)",
      machineId: "M003",
      machineName: "Welding Station B",
      timestamp: new Date("2024-01-21T13:45:00"),
      acknowledged: false,
      priority: "medium",
    },
    {
      id: "ALT003",
      type: "maintenance",
      title: "Scheduled Maintenance Due",
      message: "Regular maintenance is due within 24 hours",
      machineId: "M002",
      machineName: "Assembly Line 1",
      timestamp: new Date("2024-01-21T12:00:00"),
      acknowledged: true,
      priority: "medium",
    },
    {
      id: "ALT004",
      type: "warning",
      title: "Power Usage Spike",
      message: "Power consumption has increased by 15% from baseline",
      machineId: "M001",
      machineName: "CNC Machine A1",
      timestamp: new Date("2024-01-21T11:15:00"),
      acknowledged: true,
      priority: "low",
    },
    {
      id: "ALT005",
      type: "info",
      title: "System Update Complete",
      message: "Firmware update successfully installed",
      machineId: "M004",
      machineName: "Quality Control",
      timestamp: new Date("2024-01-21T09:30:00"),
      acknowledged: true,
      priority: "low",
    },
    {
      id: "ALT006",
      type: "critical",
      title: "Emergency Stop Activated",
      message: "Manual emergency stop was triggered by operator",
      machineId: "M005",
      machineName: "Packaging Unit",
      timestamp: new Date("2024-01-21T08:45:00"),
      acknowledged: true,
      priority: "high",
    },
  ]);

  const [filter, setFilter] = useState<
    "all" | "critical" | "warning" | "maintenance" | "info"
  >("all");

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert,
      ),
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return AlertCircle;
      case "maintenance":
        return Settings;
      case "info":
        return Info;
      default:
        return AlertCircle;
    }
  };

  const getAlertColor = (type: string, acknowledged: boolean) => {
    const opacity = acknowledged ? "50" : "";
    switch (type) {
      case "critical":
        return `text-iot-error bg-iot-error/10 border-iot-error/${opacity || "20"}`;
      case "warning":
        return `text-iot-warning bg-iot-warning/10 border-iot-warning/${opacity || "20"}`;
      case "maintenance":
        return `text-iot-blue-500 bg-iot-blue-500/10 border-iot-blue-500/${opacity || "20"}`;
      case "info":
        return `text-iot-gray-400 bg-iot-gray-400/10 border-iot-gray-400/${opacity || "20"}`;
      default:
        return `text-iot-gray-400 bg-iot-gray-400/10 border-iot-gray-400/${opacity || "20"}`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-iot-error";
      case "medium":
        return "bg-iot-warning";
      case "low":
        return "bg-iot-blue-500";
      default:
        return "bg-iot-gray-500";
    }
  };

  const filteredAlerts =
    filter === "all" ? alerts : alerts.filter((alert) => alert.type === filter);

  const unacknowledgedCount = alerts.filter(
    (alert) => !alert.acknowledged,
  ).length;
  const criticalCount = alerts.filter(
    (alert) => alert.type === "critical" && !alert.acknowledged,
  ).length;

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            Alert Center
          </h2>
          <div className="flex items-center gap-2">
            {unacknowledgedCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-iot-error/10 border border-iot-error/20 rounded-lg">
                <Bell className="w-4 h-4 text-iot-error" />
                <span className="text-sm font-medium text-iot-error">
                  {unacknowledgedCount} new
                </span>
              </div>
            )}
            {criticalCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-iot-error border-iot-error text-white rounded-lg">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {criticalCount} critical
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="maintenance">Maintenance</option>
            <option value="info">Information</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="metric-card text-center py-8">
            <CheckCircle className="w-12 h-12 text-iot-success mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No alerts found
            </h3>
            <p className="text-muted-foreground">
              {filter === "all"
                ? "All systems are operating normally"
                : `No ${filter} alerts at this time`}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`metric-card border ${getAlertColor(alert.type, alert.acknowledged)} ${
                  alert.acknowledged ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">
                            {alert.title}
                          </h3>
                          <div
                            className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!alert.acknowledged && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{alert.machineName}</span>
                        <span>•</span>
                        <span>{alert.machineId}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(alert.timestamp)}</span>
                      </div>
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
