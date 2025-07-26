import React, { useState } from "react";
import { Fan, Zap, AlertTriangle, Play, Pause, Square } from "lucide-react";

interface ControlDevice {
  id: string;
  name: string;
  type: "fan" | "motor" | "emergency";
  status: boolean;
  icon: React.ComponentType<{ className?: string }>;
  power?: number;
  description: string;
}

export function DeviceControl() {
  const [devices, setDevices] = useState<ControlDevice[]>([
    {
      id: "FAN001",
      name: "Cooling Fan A1",
      type: "fan",
      status: true,
      icon: Fan,
      power: 2.3,
      description: "CNC Machine cooling system",
    },
    {
      id: "FAN002",
      name: "Exhaust Fan B2",
      type: "fan",
      status: false,
      icon: Fan,
      power: 1.8,
      description: "Welding station ventilation",
    },
    {
      id: "MTR001",
      name: "Conveyor Motor 1",
      type: "motor",
      status: true,
      icon: Play,
      power: 5.2,
      description: "Main assembly line conveyor",
    },
    {
      id: "MTR002",
      name: "Pump Motor A",
      type: "motor",
      status: true,
      icon: Play,
      power: 3.7,
      description: "Hydraulic system pump",
    },
    {
      id: "MTR003",
      name: "Grinding Motor",
      type: "motor",
      status: false,
      icon: Pause,
      power: 0,
      description: "Material processing unit",
    },
    {
      id: "EMG001",
      name: "Emergency Shutoff",
      type: "emergency",
      status: false,
      icon: AlertTriangle,
      description: "Plant-wide emergency stop",
    },
  ]);

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === deviceId) {
          const newStatus = !device.status;
          return {
            ...device,
            status: newStatus,
            power: newStatus ? device.power || Math.random() * 5 + 1 : 0,
            icon:
              device.type === "motor"
                ? newStatus
                  ? Play
                  : Pause
                : device.icon,
          };
        }
        return device;
      }),
    );
  };

  const getDeviceTypeColor = (type: string, status: boolean) => {
    if (type === "emergency") {
      return status
        ? "bg-iot-error text-white"
        : "bg-iot-gray-700 text-iot-gray-300";
    }
    return status
      ? "bg-iot-blue-600 text-white"
      : "bg-iot-gray-700 text-iot-gray-300";
  };

  const getStatusText = (device: ControlDevice) => {
    if (device.type === "emergency") {
      return device.status ? "ACTIVE" : "STANDBY";
    }
    return device.status ? "ON" : "OFF";
  };

  const fans = devices.filter((d) => d.type === "fan");
  const motors = devices.filter((d) => d.type === "motor");
  const emergency = devices.filter((d) => d.type === "emergency");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Device Control
        </h2>
        <div className="text-sm text-muted-foreground">
          {devices.filter((d) => d.status).length} of {devices.length} devices
          active
        </div>
      </div>

      {/* Emergency Controls */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-iot-error flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Emergency Controls
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {emergency.map((device) => {
            const Icon = device.icon;
            return (
              <div key={device.id} className="metric-card border-iot-error/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-iot-error" />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {device.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {device.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        device.status
                          ? "bg-iot-error text-white"
                          : "bg-iot-gray-700 text-iot-gray-300"
                      }`}
                    >
                      {getStatusText(device)}
                    </span>
                    <button
                      onClick={() => toggleDevice(device.id)}
                      className={`w-16 h-8 rounded-full transition-all duration-200 ${
                        device.status ? "bg-iot-error" : "bg-iot-gray-600"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                          device.status ? "translate-x-8" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fans */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Fan className="w-5 h-5" />
          Cooling Systems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fans.map((device) => {
            const Icon = device.icon;
            return (
              <div key={device.id} className="metric-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${device.status ? "text-iot-blue-500 animate-spin" : "text-iot-gray-500"}`}
                    />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {device.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {device.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDevice(device.id)}
                    className={`w-12 h-6 rounded-full transition-all duration-200 ${
                      device.status ? "bg-iot-blue-600" : "bg-iot-gray-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        device.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Power Usage</span>
                  <span className="font-medium text-iot-orange-500">
                    {device.power?.toFixed(1) || "0.0"} kW
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motors */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Motor Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {motors.map((device) => {
            const Icon = device.icon;
            return (
              <div key={device.id} className="metric-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${device.status ? "text-iot-success" : "text-iot-gray-500"}`}
                    />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {device.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {device.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDevice(device.id)}
                    className={`w-12 h-6 rounded-full transition-all duration-200 ${
                      device.status ? "bg-iot-success" : "bg-iot-gray-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        device.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></div>
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`font-medium ${device.status ? "text-iot-success" : "text-iot-gray-500"}`}
                    >
                      {getStatusText(device)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Power</span>
                    <span className="font-medium text-iot-orange-500">
                      {device.power?.toFixed(1) || "0.0"} kW
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
