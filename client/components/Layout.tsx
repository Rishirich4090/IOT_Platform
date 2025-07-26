import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  AlertTriangle,
  BarChart3,
  Settings,
  Wifi,
  Bell,
} from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { useAuth } from "../contexts/AuthContext";
import { ROLE_DISPLAY_NAMES } from "../types/permissions";
import { UserRoleIndicator } from "./UserRoleIndicator";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard },
  { path: "/devices", label: "Devices", icon: Cpu },
  { path: "/alerts", label: "Alerts", icon: AlertTriangle },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout || (() => {});

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">
                  ManufactureIoT
                </h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="status-indicator status-online"></div>
                <span>12 devices online</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi className="w-4 h-4" />
                <span>Connected</span>
              </div>
              <UserRoleIndicator />
              <button className="relative p-2 rounded-lg hover:bg-accent">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-iot-orange-500 rounded-full"></div>
              </button>
              {user && (
                <UserDropdown
                  user={{
                    ...user,
                    role: ROLE_DISPLAY_NAMES[user.role] || user.role,
                  }}
                  onLogout={logout}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <nav className="hidden lg:flex flex-col w-64 border-r border-border bg-card/30 min-h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 lg:px-6 py-6">{children}</div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[60px] ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
