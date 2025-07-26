import React from "react";
import {
  Shield,
  Crown,
  Wrench,
  Settings,
  FileText,
  CheckCircle,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ROLE_DISPLAY_NAMES } from "../types/permissions";

export function UserRoleIndicator() {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "plant_manager":
        return Crown;
      case "supervisor":
        return Shield;
      case "technician":
        return Wrench;
      case "operator":
        return Settings;
      case "office_staff":
        return FileText;
      case "quality_inspector":
        return CheckCircle;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "plant_manager":
        return "text-iot-warning bg-iot-warning/10 border-iot-warning/20";
      case "supervisor":
        return "text-iot-blue-600 bg-iot-blue-600/10 border-iot-blue-600/20";
      case "technician":
        return "text-iot-success bg-iot-success/10 border-iot-success/20";
      case "operator":
        return "text-iot-orange-500 bg-iot-orange-500/10 border-iot-orange-500/20";
      case "office_staff":
        return "text-iot-blue-500 bg-iot-blue-500/10 border-iot-blue-500/20";
      case "quality_inspector":
        return "text-iot-success bg-iot-success/10 border-iot-success/20";
      default:
        return "text-iot-gray-500 bg-iot-gray-500/10 border-iot-gray-500/20";
    }
  };

  const Icon = getRoleIcon(user.role);
  const colorClass = getRoleColor(user.role);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${colorClass}`}
    >
      <Icon className="w-4 h-4" />
      <span>{ROLE_DISPLAY_NAMES[user.role]}</span>
      {user.employeeId && (
        <span className="text-xs opacity-75">({user.employeeId})</span>
      )}
    </div>
  );
}
