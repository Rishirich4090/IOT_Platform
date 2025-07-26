import React from "react";
import { usePermissions } from "../hooks/usePermissions";

interface PermissionWrapperProps {
  children: React.ReactNode;
  module: string;
  action: string;
  fallback?: React.ReactNode;
  requireAll?: boolean;
}

interface MultiplePermissionWrapperProps {
  children: React.ReactNode;
  permissions: Array<{ module: string; action: string }>;
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

export function PermissionWrapper({
  children,
  module,
  action,
  fallback = null,
}: PermissionWrapperProps) {
  const { checkPermission } = usePermissions();

  if (!checkPermission(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function MultiplePermissionWrapper({
  children,
  permissions,
  requireAll = false,
  fallback = null,
}: MultiplePermissionWrapperProps) {
  const { checkPermission } = usePermissions();

  const hasPermissions = requireAll
    ? permissions.every((p) => checkPermission(p.module, p.action))
    : permissions.some((p) => checkPermission(p.module, p.action));

  if (!hasPermissions) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Role-based wrapper for specific roles
interface RoleWrapperProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function RoleWrapper({
  children,
  allowedRoles,
  fallback = null,
}: RoleWrapperProps) {
  const { userRole } = usePermissions();

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Quick permission check components
export function PlantManagerOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isPlantManager } = usePermissions();
  return isPlantManager() ? <>{children}</> : <>{fallback}</>;
}

export function SupervisorOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isSupervisor } = usePermissions();
  return isSupervisor() ? <>{children}</> : <>{fallback}</>;
}

export function TechnicianOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isTechnician } = usePermissions();
  return isTechnician() ? <>{children}</> : <>{fallback}</>;
}

export function OperatorOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isOperator } = usePermissions();
  return isOperator() ? <>{children}</> : <>{fallback}</>;
}

export function OfficeStaffOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isOfficeStaff } = usePermissions();
  return isOfficeStaff() ? <>{children}</> : <>{fallback}</>;
}

export function QualityInspectorOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isQualityInspector } = usePermissions();
  return isQualityInspector() ? <>{children}</> : <>{fallback}</>;
}
