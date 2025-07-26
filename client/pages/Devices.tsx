import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  RotateCcw,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Activity,
  Droplets,
  Zap,
  Gauge,
  Wrench,
  Calendar,
  MapPin,
  Cpu,
  Power,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Download,
  Eye,
  Edit3,
  Plus,
} from "lucide-react";
import { AddDeviceModal } from "../components/AddDeviceModal";
import { PermissionWrapper } from "../components/PermissionWrapper";
import { usePermissions } from "../hooks/usePermissions";

interface DeviceData {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "online" | "offline" | "warning" | "error" | "maintenance";
  lastSeen: Date;
  ipAddress: string;
  firmware: string;
  serialNumber: string;
  installDate: Date;
  manufacturer: string;
  model: string;
  metrics: {
    temperature: number;
    humidity: number;
    vibration: number;
    powerUsage: number;
    pressure?: number;
    speed?: number;
  };
  runtime: {
    totalHours: number;
    todayHours: number;
    uptime: number;
    cycleCount: number;
  };
  faults: Array<{
    id: string;
    type: string;
    severity: "low" | "medium" | "high" | "critical";
    message: string;
    timestamp: Date;
    resolved: boolean;
  }>;
  maintenance: {
    lastService: Date;
    nextService: Date;
    serviceHours: number;
    maintenanceType: string;
  };
}

export function Devices() {
  const [devices, setDevices] = useState<DeviceData[]>([
    {
      id: "M001",
      name: "CNC Machine A1",
      type: "CNC Machining Center",
      location: "Production Line A - Station 1",
      status: "online",
      lastSeen: new Date("2024-01-21T15:30:00"),
      ipAddress: "192.168.1.101",
      firmware: "v2.4.1",
      serialNumber: "CNC-2023-A001",
      installDate: new Date("2023-06-15"),
      manufacturer: "Fanuc",
      model: "R-2000iC/125L",
      metrics: {
        temperature: 68.5,
        humidity: 45.2,
        vibration: 0.3,
        powerUsage: 12.5,
        pressure: 2100,
        speed: 1450,
      },
      runtime: {
        totalHours: 5432,
        todayHours: 8.5,
        uptime: 94.8,
        cycleCount: 15240,
      },
      faults: [
        {
          id: "F001",
          type: "Temperature Warning",
          severity: "medium",
          message: "Operating temperature approaching upper limit",
          timestamp: new Date("2024-01-21T10:15:00"),
          resolved: false,
        },
      ],
      maintenance: {
        lastService: new Date("2024-01-10"),
        nextService: new Date("2024-02-10"),
        serviceHours: 168,
        maintenanceType: "Preventive",
      },
    },
    {
      id: "M002",
      name: "Assembly Line 1",
      type: "Automated Assembly",
      location: "Production Line A - Station 2",
      status: "online",
      lastSeen: new Date("2024-01-21T15:29:00"),
      ipAddress: "192.168.1.102",
      firmware: "v3.1.2",
      serialNumber: "ASM-2023-B002",
      installDate: new Date("2023-04-20"),
      manufacturer: "ABB",
      model: "FlexPicker IRB 360",
      metrics: {
        temperature: 72.1,
        humidity: 48.1,
        vibration: 0.8,
        powerUsage: 28.3,
        speed: 850,
      },
      runtime: {
        totalHours: 6234,
        todayHours: 9.2,
        uptime: 96.1,
        cycleCount: 28450,
      },
      faults: [],
      maintenance: {
        lastService: new Date("2024-01-05"),
        nextService: new Date("2024-02-05"),
        serviceHours: 144,
        maintenanceType: "Routine",
      },
    },
    {
      id: "M003",
      name: "Welding Station B",
      type: "Robotic Welding",
      location: "Production Line B - Station 3",
      status: "warning",
      lastSeen: new Date("2024-01-21T15:28:00"),
      ipAddress: "192.168.1.103",
      firmware: "v1.8.5",
      serialNumber: "WLD-2023-C003",
      installDate: new Date("2023-03-10"),
      manufacturer: "KUKA",
      model: "KR 10 R1100",
      metrics: {
        temperature: 85.2,
        humidity: 52.8,
        vibration: 1.2,
        powerUsage: 15.8,
        pressure: 1850,
        speed: 1200,
      },
      runtime: {
        totalHours: 4876,
        todayHours: 6.8,
        uptime: 89.3,
        cycleCount: 12890,
      },
      faults: [
        {
          id: "F002",
          type: "High Temperature",
          severity: "high",
          message: "Temperature exceeded safe operating range",
          timestamp: new Date("2024-01-21T14:45:00"),
          resolved: false,
        },
        {
          id: "F003",
          type: "Vibration Alert",
          severity: "medium",
          message: "Elevated vibration levels detected",
          timestamp: new Date("2024-01-21T13:20:00"),
          resolved: false,
        },
      ],
      maintenance: {
        lastService: new Date("2024-01-18"),
        nextService: new Date("2024-02-18"),
        serviceHours: 72,
        maintenanceType: "Corrective",
      },
    },
    {
      id: "M004",
      name: "Quality Control",
      type: "Inspection System",
      location: "Quality Assurance Lab",
      status: "online",
      lastSeen: new Date("2024-01-21T15:30:00"),
      ipAddress: "192.168.1.104",
      firmware: "v4.2.0",
      serialNumber: "QC-2023-D004",
      installDate: new Date("2023-08-05"),
      manufacturer: "Cognex",
      model: "In-Sight 9912",
      metrics: {
        temperature: 70.3,
        humidity: 41.5,
        vibration: 0.2,
        powerUsage: 8.7,
        speed: 600,
      },
      runtime: {
        totalHours: 3456,
        todayHours: 7.9,
        uptime: 97.8,
        cycleCount: 45670,
      },
      faults: [],
      maintenance: {
        lastService: new Date("2024-01-12"),
        nextService: new Date("2024-03-12"),
        serviceHours: 240,
        maintenanceType: "Preventive",
      },
    },
    {
      id: "M005",
      name: "Packaging Unit",
      type: "Automated Packaging",
      location: "Production Line A - Station 5",
      status: "error",
      lastSeen: new Date("2024-01-21T14:30:00"),
      ipAddress: "192.168.1.105",
      firmware: "v2.1.3",
      serialNumber: "PKG-2023-E005",
      installDate: new Date("2023-05-18"),
      manufacturer: "Bosch",
      model: "Sigpack TTMD",
      metrics: {
        temperature: 91.8,
        humidity: 58.3,
        vibration: 2.1,
        powerUsage: 0,
        speed: 0,
      },
      runtime: {
        totalHours: 4123,
        todayHours: 0,
        uptime: 76.3,
        cycleCount: 8920,
      },
      faults: [
        {
          id: "F004",
          type: "Motor Failure",
          severity: "critical",
          message: "Main drive motor has failed - immediate service required",
          timestamp: new Date("2024-01-21T14:30:00"),
          resolved: false,
        },
        {
          id: "F005",
          type: "Emergency Stop",
          severity: "critical",
          message: "Emergency stop activated due to safety breach",
          timestamp: new Date("2024-01-21T14:29:00"),
          resolved: false,
        },
      ],
      maintenance: {
        lastService: new Date("2024-01-20"),
        nextService: new Date("2024-01-25"),
        serviceHours: 0,
        maintenanceType: "Emergency",
      },
    },
    {
      id: "M006",
      name: "Material Handler",
      type: "Conveyor System",
      location: "Warehouse Section C",
      status: "online",
      lastSeen: new Date("2024-01-21T15:30:00"),
      ipAddress: "192.168.1.106",
      firmware: "v1.5.7",
      serialNumber: "MTH-2023-F006",
      installDate: new Date("2023-07-22"),
      manufacturer: "Siemens",
      model: "SINAMICS S120",
      metrics: {
        temperature: 66.8,
        humidity: 44.7,
        vibration: 0.4,
        powerUsage: 6.2,
        speed: 750,
      },
      runtime: {
        totalHours: 2987,
        todayHours: 8.1,
        uptime: 93.4,
        cycleCount: 52400,
      },
      faults: [
        {
          id: "F006",
          type: "Belt Alignment",
          severity: "low",
          message: "Minor belt misalignment detected",
          timestamp: new Date("2024-01-21T09:15:00"),
          resolved: false,
        },
      ],
      maintenance: {
        lastService: new Date("2024-01-14"),
        nextService: new Date("2024-02-14"),
        serviceHours: 180,
        maintenanceType: "Routine",
      },
    },
  ]);

  const [filteredDevices, setFilteredDevices] = useState<DeviceData[]>(devices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { canAdd, canEdit, canDelete, canExport } = usePermissions();

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          metrics: {
            ...device.metrics,
            temperature:
              device.status === "error"
                ? device.metrics.temperature
                : device.metrics.temperature + (Math.random() - 0.5) * 2,
            vibration:
              device.status === "error"
                ? device.metrics.vibration
                : Math.max(
                    0,
                    device.metrics.vibration + (Math.random() - 0.5) * 0.1,
                  ),
            humidity: device.metrics.humidity + (Math.random() - 0.5) * 2,
            powerUsage:
              device.status === "error"
                ? 0
                : Math.max(
                    0,
                    device.metrics.powerUsage + (Math.random() - 0.5) * 1,
                  ),
          },
          lastSeen: device.status !== "error" ? new Date() : device.lastSeen,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter devices
  useEffect(() => {
    let filtered = devices;

    if (searchTerm) {
      filtered = filtered.filter(
        (device) =>
          device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((device) => device.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((device) => device.type === typeFilter);
    }

    setFilteredDevices(filtered);
  }, [devices, searchTerm, statusFilter, typeFilter]);

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

  const formatUptime = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    const minutes = Math.floor((hours % 1) * 60);
    return `${days}d ${remainingHours}h ${minutes}m`;
  };

  const deviceTypes = [...new Set(devices.map((d) => d.type))];
  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const offlineDevices = devices.filter((d) => d.status === "offline").length;
  const warningDevices = devices.filter((d) => d.status === "warning").length;
  const errorDevices = devices.filter((d) => d.status === "error").length;

  const handleAddDevice = (newDeviceData: any) => {
    const newDevice: DeviceData = {
      id: `M${String(devices.length + 1).padStart(3, "0")}`,
      name: newDeviceData.name,
      type: newDeviceData.type,
      location: newDeviceData.location,
      status: "offline",
      lastSeen: new Date(),
      ipAddress: newDeviceData.ipAddress,
      firmware: newDeviceData.firmware || "v1.0.0",
      serialNumber: newDeviceData.serialNumber,
      installDate: new Date(),
      manufacturer: newDeviceData.manufacturer,
      model: newDeviceData.model,
      metrics: {
        temperature: 20.0,
        humidity: 45.0,
        vibration: 0.0,
        powerUsage: 0.0,
        pressure: 0,
        speed: 0,
      },
      runtime: {
        totalHours: 0,
        todayHours: 0,
        uptime: 0,
        cycleCount: 0,
      },
      faults: [],
      maintenance: {
        lastService: new Date(),
        nextService: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        serviceHours: 0,
        maintenanceType: "Initial Setup",
      },
    };

    setDevices((prev) => [...prev, newDevice]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Device Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all manufacturing equipment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PermissionWrapper module="devices" action="export">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export List</span>
            </button>
          </PermissionWrapper>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Refresh All</span>
          </button>
          <PermissionWrapper module="devices" action="add">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Device</span>
            </button>
          </PermissionWrapper>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Cpu className="w-4 h-4 text-iot-blue-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">{totalDevices}</p>
          <p className="text-sm text-muted-foreground">Total Devices</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-4 h-4 text-iot-success" />
          </div>
          <p className="text-2xl font-bold text-iot-success">{onlineDevices}</p>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-4 h-4 text-iot-warning" />
          </div>
          <p className="text-2xl font-bold text-iot-warning">
            {warningDevices}
          </p>
          <p className="text-sm text-muted-foreground">Warnings</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-error/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-4 h-4 text-iot-error" />
          </div>
          <p className="text-2xl font-bold text-iot-error">{errorDevices}</p>
          <p className="text-sm text-muted-foreground">Errors</p>
        </div>

        <div className="metric-card text-center">
          <div className="w-8 h-8 bg-iot-gray-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Power className="w-4 h-4 text-iot-gray-500" />
          </div>
          <p className="text-2xl font-bold text-iot-gray-500">
            {offlineDevices}
          </p>
          <p className="text-sm text-muted-foreground">Offline</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search devices by name, ID, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="offline">Offline</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Devices Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDevices.map((device) => {
            const StatusIcon = getStatusIcon(device.status);
            const activeFaults = device.faults.filter((f) => !f.resolved);

            return (
              <div key={device.id} className="metric-card">
                {/* Device Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
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
                        className={`w-5 h-5 ${getStatusColor(device.status)}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {device.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {device.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-accent rounded">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Device Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-foreground">{device.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground text-right">
                      {device.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">IP Address</span>
                    <span className="text-foreground">{device.ipAddress}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-accent/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="w-4 h-4 text-iot-orange-500" />
                      <span className="text-xs text-muted-foreground">
                        Temp
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {device.metrics.temperature.toFixed(1)}°C
                    </p>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-iot-blue-500" />
                      <span className="text-xs text-muted-foreground">
                        Uptime
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {device.runtime.uptime.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-iot-warning" />
                      <span className="text-xs text-muted-foreground">
                        Power
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {device.metrics.powerUsage.toFixed(1)}kW
                    </p>
                  </div>
                  <div className="bg-accent/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-iot-error" />
                      <span className="text-xs text-muted-foreground">
                        Faults
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {activeFaults.length}
                    </p>
                  </div>
                </div>

                {/* Runtime */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Today Runtime</span>
                    <span className="text-foreground">
                      {device.runtime.todayHours.toFixed(1)}h
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Runtime</span>
                    <span className="text-foreground">
                      {device.runtime.totalHours.toLocaleString()}h
                    </span>
                  </div>
                </div>

                {/* Active Faults */}
                {activeFaults.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      Active Faults
                    </h4>
                    {activeFaults.slice(0, 2).map((fault) => (
                      <div
                        key={fault.id}
                        className="p-2 bg-iot-error/10 border border-iot-error/20 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-medium ${getSeverityColor(fault.severity)}`}
                          >
                            {fault.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {fault.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {fault.message}
                        </p>
                      </div>
                    ))}
                    {activeFaults.length > 2 && (
                      <p className="text-xs text-iot-blue-500">
                        +{activeFaults.length - 2} more faults
                      </p>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                  <span className="text-xs text-muted-foreground">
                    Last seen: {device.lastSeen.toLocaleTimeString()}
                  </span>
                  <button className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="metric-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Device
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Temperature
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Runtime
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Faults
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => {
                  const StatusIcon = getStatusIcon(device.status);
                  const activeFaults = device.faults.filter((f) => !f.resolved);

                  return (
                    <tr
                      key={device.id}
                      className="border-b border-border hover:bg-accent/50"
                    >
                      <td className="p-4">
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
                            <p className="font-medium text-foreground">
                              {device.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {device.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`capitalize font-medium ${getStatusColor(device.status)}`}
                        >
                          {device.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">
                          {device.metrics.temperature.toFixed(1)}°C
                        </span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-foreground">
                            {device.runtime.uptime.toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {device.runtime.todayHours.toFixed(1)}h today
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-medium ${activeFaults.length > 0 ? "text-iot-error" : "text-iot-success"}`}
                        >
                          {activeFaults.length}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">
                          {device.location}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-accent rounded">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-accent rounded">
                            <Settings className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-accent rounded">
                            <Edit3 className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredDevices.length === 0 && (
        <div className="metric-card text-center py-8">
          <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No devices found
          </h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No devices are currently registered in the system"}
          </p>
        </div>
      )}

      {/* Add Device Modal */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDevice={handleAddDevice}
      />
    </div>
  );
}
