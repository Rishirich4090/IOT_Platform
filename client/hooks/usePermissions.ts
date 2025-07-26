import { useAuth } from "../contexts/AuthContext";
import {
  hasPermission,
  getRolePermissions,
  UserRole,
} from "../types/permissions";

export function usePermissions() {
  const { user } = useAuth();

  const checkPermission = (module: string, action: string): boolean => {
    if (!user?.role) return false;
    return hasPermission(user.role as UserRole, module, action);
  };

  const getAllPermissions = (): string[] => {
    if (!user?.role) return [];
    return getRolePermissions(user.role as UserRole);
  };

  const canView = (module: string): boolean => {
    return checkPermission(module, "view");
  };

  const canEdit = (module: string): boolean => {
    return checkPermission(module, "edit");
  };

  const canDelete = (module: string): boolean => {
    return checkPermission(module, "delete");
  };

  const canAdd = (module: string): boolean => {
    return checkPermission(module, "add");
  };

  const canControl = (module: string): boolean => {
    return checkPermission(module, "control");
  };

  const canExport = (module: string): boolean => {
    return checkPermission(module, "export");
  };

  const canManage = (module: string): boolean => {
    return checkPermission(module, "manage");
  };

  const canConfigure = (module: string): boolean => {
    return checkPermission(module, "configure");
  };

  const isPlantManager = (): boolean => {
    return user?.role === "plant_manager";
  };

  const isSupervisor = (): boolean => {
    return user?.role === "supervisor";
  };

  const isTechnician = (): boolean => {
    return user?.role === "technician";
  };

  const isOperator = (): boolean => {
    return user?.role === "operator";
  };

  const isOfficeStaff = (): boolean => {
    return user?.role === "office_staff";
  };

  const isQualityInspector = (): boolean => {
    return user?.role === "quality_inspector";
  };

  return {
    checkPermission,
    getAllPermissions,
    canView,
    canEdit,
    canDelete,
    canAdd,
    canControl,
    canExport,
    canManage,
    canConfigure,
    isPlantManager,
    isSupervisor,
    isTechnician,
    isOperator,
    isOfficeStaff,
    isQualityInspector,
    userRole: user?.role as UserRole,
  };
}
