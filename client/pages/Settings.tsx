import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Wifi,
  Download,
  Upload,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Mail,
  MessageSquare,
  Lock,
  Key,
  RefreshCw,
  Trash2,
  FileText,
  Calendar,
  Clock,
  Globe,
  MapPin,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    title: "User Profile",
    icon: User,
    description: "Personal information and account settings",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Alert preferences and communication settings",
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    description: "Password, authentication, and access control",
  },
  {
    id: "system",
    title: "System",
    icon: SettingsIcon,
    description: "System preferences and configurations",
  },
  {
    id: "data",
    title: "Data Management",
    icon: Database,
    description: "Data retention, backup, and export settings",
  },
  {
    id: "display",
    title: "Display & Theme",
    icon: Palette,
    description: "Appearance, theme, and layout preferences",
  },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      firstName: "Rishi",
      lastName: "Raj",
      email: "rishi.raj@manufacturiot.com",
      role: "Plant Manager",
      department: "Production",
      phone: "+1 (555) 123-4567",
      timezone: "America/New_York",
      language: "English (US)",
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      criticalAlertsOnly: false,
      maintenanceReminders: true,
      productionReports: true,
      weeklyDigest: true,
      realTimeUpdates: true,
      alertThreshold: "medium",
      quietHoursEnabled: true,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginNotifications: true,
      ipWhitelist: false,
      deviceTrust: true,
    },
    system: {
      autoRefresh: true,
      refreshInterval: 30,
      dataRetention: 365,
      backupFrequency: "daily",
      maintenanceWindow: "02:00",
      logLevel: "info",
      performanceMode: "balanced",
    },
    data: {
      autoBackup: true,
      backupLocation: "cloud",
      compressionEnabled: true,
      encryptionEnabled: true,
      exportFormat: "csv",
      retentionPolicy: "rolling",
    },
    display: {
      theme: "dark",
      colorScheme: "blue",
      dashboardLayout: "grid",
      chartAnimations: true,
      compactMode: false,
      highContrast: false,
      fontSize: "medium",
      showTooltips: true,
    },
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            First Name
          </label>
          <input
            type="text"
            value={settings.profile.firstName}
            onChange={(e) =>
              updateSetting("profile", "firstName", e.target.value)
            }
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Last Name
          </label>
          <input
            type="text"
            value={settings.profile.lastName}
            onChange={(e) =>
              updateSetting("profile", "lastName", e.target.value)
            }
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => updateSetting("profile", "email", e.target.value)}
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => updateSetting("profile", "phone", e.target.value)}
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Role</label>
          <input
            type="text"
            value={settings.profile.role}
            onChange={(e) => updateSetting("profile", "role", e.target.value)}
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Department
          </label>
          <input
            type="text"
            value={settings.profile.department}
            onChange={(e) =>
              updateSetting("profile", "department", e.target.value)
            }
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Timezone
          </label>
          <select
            value={settings.profile.timezone}
            onChange={(e) =>
              updateSetting("profile", "timezone", e.target.value)
            }
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Language
          </label>
          <select
            value={settings.profile.language}
            onChange={(e) =>
              updateSetting("profile", "language", e.target.value)
            }
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="English (US)">English (US)</option>
            <option value="English (UK)">English (UK)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Alert Channels
          </h3>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-iot-blue-500" />
              <div>
                <p className="font-medium text-foreground">Email Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts via email
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "notifications",
                  "emailAlerts",
                  !settings.notifications.emailAlerts,
                )
              }
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                settings.notifications.emailAlerts
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  settings.notifications.emailAlerts
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-iot-blue-500" />
              <div>
                <p className="font-medium text-foreground">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Critical alerts via SMS
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "notifications",
                  "smsAlerts",
                  !settings.notifications.smsAlerts,
                )
              }
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                settings.notifications.smsAlerts
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  settings.notifications.smsAlerts
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-iot-blue-500" />
              <div>
                <p className="font-medium text-foreground">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Browser notifications
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "notifications",
                  "pushNotifications",
                  !settings.notifications.pushNotifications,
                )
              }
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                settings.notifications.pushNotifications
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  settings.notifications.pushNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Notification Types
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                Critical Alerts Only
              </span>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "criticalAlertsOnly",
                    !settings.notifications.criticalAlertsOnly,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.notifications.criticalAlertsOnly
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.notifications.criticalAlertsOnly
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                Maintenance Reminders
              </span>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "maintenanceReminders",
                    !settings.notifications.maintenanceReminders,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.notifications.maintenanceReminders
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.notifications.maintenanceReminders
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                Production Reports
              </span>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "productionReports",
                    !settings.notifications.productionReports,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.notifications.productionReports
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.notifications.productionReports
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Weekly Digest</span>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "weeklyDigest",
                    !settings.notifications.weeklyDigest,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.notifications.weeklyDigest
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.notifications.weeklyDigest
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Alert Threshold
            </label>
            <select
              value={settings.notifications.alertThreshold}
              onChange={(e) =>
                updateSetting("notifications", "alertThreshold", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low - All alerts</option>
              <option value="medium">Medium - Important alerts</option>
              <option value="high">High - Critical only</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Quiet Hours
              </label>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "quietHoursEnabled",
                    !settings.notifications.quietHoursEnabled,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.notifications.quietHoursEnabled
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.notifications.quietHoursEnabled
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
            {settings.notifications.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Start</label>
                  <input
                    type="time"
                    value={settings.notifications.quietHoursStart}
                    onChange={(e) =>
                      updateSetting(
                        "notifications",
                        "quietHoursStart",
                        e.target.value,
                      )
                    }
                    className="w-full px-2 py-1 bg-card border border-border rounded text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">End</label>
                  <input
                    type="time"
                    value={settings.notifications.quietHoursEnd}
                    onChange={(e) =>
                      updateSetting(
                        "notifications",
                        "quietHoursEnd",
                        e.target.value,
                      )
                    }
                    className="w-full px-2 py-1 bg-card border border-border rounded text-foreground text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Authentication
          </h3>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-iot-success" />
              <div>
                <p className="font-medium text-foreground">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-muted-foreground">
                  Enhanced security with 2FA
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "security",
                  "twoFactorAuth",
                  !settings.security.twoFactorAuth,
                )
              }
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                settings.security.twoFactorAuth
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  settings.security.twoFactorAuth
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Session Timeout (minutes)
            </label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                updateSetting(
                  "security",
                  "sessionTimeout",
                  parseInt(e.target.value),
                )
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Password Expiry (days)
            </label>
            <select
              value={settings.security.passwordExpiry}
              onChange={(e) =>
                updateSetting(
                  "security",
                  "passwordExpiry",
                  parseInt(e.target.value),
                )
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Access Control
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                Login Notifications
              </span>
              <button
                onClick={() =>
                  updateSetting(
                    "security",
                    "loginNotifications",
                    !settings.security.loginNotifications,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.security.loginNotifications
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.security.loginNotifications
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">IP Whitelist</span>
              <button
                onClick={() =>
                  updateSetting(
                    "security",
                    "ipWhitelist",
                    !settings.security.ipWhitelist,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.security.ipWhitelist
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.security.ipWhitelist
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Device Trust</span>
              <button
                onClick={() =>
                  updateSetting(
                    "security",
                    "deviceTrust",
                    !settings.security.deviceTrust,
                  )
                }
                className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  settings.security.deviceTrust
                    ? "bg-iot-success"
                    : "bg-iot-gray-600"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                    settings.security.deviceTrust
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          <div className="p-4 bg-iot-warning/10 border border-iot-warning/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-iot-warning" />
              <span className="text-sm font-medium text-iot-warning">
                Change Password
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Last changed 45 days ago. Recommended: Change every 90 days.
            </p>
            <button className="px-3 py-1 bg-iot-warning text-black rounded text-sm font-medium hover:bg-iot-warning/90 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Performance</h3>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Auto Refresh</span>
            <button
              onClick={() =>
                updateSetting(
                  "system",
                  "autoRefresh",
                  !settings.system.autoRefresh,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.system.autoRefresh
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.system.autoRefresh
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Refresh Interval (seconds)
            </label>
            <select
              value={settings.system.refreshInterval}
              onChange={(e) =>
                updateSetting(
                  "system",
                  "refreshInterval",
                  parseInt(e.target.value),
                )
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={300}>5 minutes</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Performance Mode
            </label>
            <select
              value={settings.system.performanceMode}
              onChange={(e) =>
                updateSetting("system", "performanceMode", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="performance">High Performance</option>
              <option value="balanced">Balanced</option>
              <option value="efficiency">Power Efficiency</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Maintenance</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Data Retention (days)
            </label>
            <select
              value={settings.system.dataRetention}
              onChange={(e) =>
                updateSetting(
                  "system",
                  "dataRetention",
                  parseInt(e.target.value),
                )
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year</option>
              <option value={730}>2 years</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Backup Frequency
            </label>
            <select
              value={settings.system.backupFrequency}
              onChange={(e) =>
                updateSetting("system", "backupFrequency", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Maintenance Window
            </label>
            <input
              type="time"
              value={settings.system.maintenanceWindow}
              onChange={(e) =>
                updateSetting("system", "maintenanceWindow", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Log Level
            </label>
            <select
              value={settings.system.logLevel}
              onChange={(e) =>
                updateSetting("system", "logLevel", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Backup & Recovery
          </h3>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-iot-blue-500" />
              <div>
                <p className="font-medium text-foreground">Auto Backup</p>
                <p className="text-sm text-muted-foreground">
                  Automatic data backup
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting("data", "autoBackup", !settings.data.autoBackup)
              }
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                settings.data.autoBackup ? "bg-iot-success" : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  settings.data.autoBackup ? "translate-x-6" : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Backup Location
            </label>
            <select
              value={settings.data.backupLocation}
              onChange={(e) =>
                updateSetting("data", "backupLocation", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="cloud">Cloud Storage</option>
              <option value="local">Local Storage</option>
              <option value="network">Network Drive</option>
              <option value="hybrid">Hybrid (Cloud + Local)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Compression Enabled</span>
            <button
              onClick={() =>
                updateSetting(
                  "data",
                  "compressionEnabled",
                  !settings.data.compressionEnabled,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.data.compressionEnabled
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.data.compressionEnabled
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Encryption Enabled</span>
            <button
              onClick={() =>
                updateSetting(
                  "data",
                  "encryptionEnabled",
                  !settings.data.encryptionEnabled,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.data.encryptionEnabled
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.data.encryptionEnabled
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Export & Import
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Export Format
            </label>
            <select
              value={settings.data.exportFormat}
              onChange={(e) =>
                updateSetting("data", "exportFormat", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xml">XML</option>
              <option value="excel">Excel</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Retention Policy
            </label>
            <select
              value={settings.data.retentionPolicy}
              onChange={(e) =>
                updateSetting("data", "retentionPolicy", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="rolling">Rolling Deletion</option>
              <option value="manual">Manual Cleanup</option>
              <option value="archive">Archive Old Data</option>
              <option value="never">Never Delete</option>
            </select>
          </div>

          <div className="space-y-3 pt-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-iot-blue-600 text-white rounded-lg hover:bg-iot-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Current Data
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
              <Upload className="w-4 h-4" />
              Import Data
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-iot-warning text-black rounded-lg hover:bg-iot-warning/90 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Create Manual Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Appearance</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "auto", label: "Auto", icon: Monitor },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateSetting("display", "theme", value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                    settings.display.theme === value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Color Scheme
            </label>
            <select
              value={settings.display.colorScheme}
              onChange={(e) =>
                updateSetting("display", "colorScheme", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Font Size
            </label>
            <select
              value={settings.display.fontSize}
              onChange={(e) =>
                updateSetting("display", "fontSize", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">High Contrast</span>
            <button
              onClick={() =>
                updateSetting(
                  "display",
                  "highContrast",
                  !settings.display.highContrast,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.display.highContrast
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.display.highContrast
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Layout</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Dashboard Layout
            </label>
            <select
              value={settings.display.dashboardLayout}
              onChange={(e) =>
                updateSetting("display", "dashboardLayout", e.target.value)
              }
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="grid">Grid Layout</option>
              <option value="list">List Layout</option>
              <option value="cards">Card Layout</option>
              <option value="compact">Compact Layout</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Chart Animations</span>
            <button
              onClick={() =>
                updateSetting(
                  "display",
                  "chartAnimations",
                  !settings.display.chartAnimations,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.display.chartAnimations
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.display.chartAnimations
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Compact Mode</span>
            <button
              onClick={() =>
                updateSetting(
                  "display",
                  "compactMode",
                  !settings.display.compactMode,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.display.compactMode
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.display.compactMode
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Show Tooltips</span>
            <button
              onClick={() =>
                updateSetting(
                  "display",
                  "showTooltips",
                  !settings.display.showTooltips,
                )
              }
              className={`w-10 h-5 rounded-full transition-all duration-200 ${
                settings.display.showTooltips
                  ? "bg-iot-success"
                  : "bg-iot-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                  settings.display.showTooltips
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "system":
        return renderSystemSettings();
      case "data":
        return renderDataSettings();
      case "display":
        return renderDisplaySettings();
      default:
        return null;
    }
  };

  const currentSection = settingsSections.find(
    (section) => section.id === activeSection,
  );

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your IoT dashboard preferences and configuration
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" />
            <span className="text-sm">Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="metric-card p-0">
            <div className="p-4 border-b border-border">
              <h2 className="font-medium text-foreground">
                Settings Categories
              </h2>
            </div>
            <nav className="p-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs opacity-80">
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="metric-card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                {currentSection && (
                  <currentSection.icon className="w-6 h-6 text-primary" />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {currentSection?.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentSection?.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">{renderSectionContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
