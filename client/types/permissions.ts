export type UserRole =
  | "plant_manager"
  | "supervisor"
  | "technician"
  | "operator"
  | "office_staff"
  | "quality_inspector";

export interface Permission {
  module: string;
  actions: string[];
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  description: string;
}

// Define all available permissions
export const PERMISSIONS = {
  OVERVIEW: {
    VIEW: "overview:view",
    EXPORT: "overview:export",
  },
  DEVICES: {
    VIEW: "devices:view",
    ADD: "devices:add",
    EDIT: "devices:edit",
    DELETE: "devices:delete",
    CONTROL: "devices:control",
    MAINTENANCE: "devices:maintenance",
  },
  ALERTS: {
    VIEW: "alerts:view",
    MANAGE: "alerts:manage",
    CONFIGURE: "alerts:configure",
    ACKNOWLEDGE: "alerts:acknowledge",
  },
  ANALYTICS: {
    VIEW: "analytics:view",
    EXPORT: "analytics:export",
    ADVANCED: "analytics:advanced",
  },
  SETTINGS: {
    VIEW: "settings:view",
    EDIT: "settings:edit",
    SYSTEM: "settings:system",
    USERS: "settings:users",
    SECURITY: "settings:security",
  },
  HELP: {
    VIEW: "help:view",
    SUPPORT: "help:support",
  },
} as const;

// Role definitions with their permissions
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  plant_manager: {
    role: "plant_manager",
    description: "Full access to all systems and administrative functions",
    permissions: [
      {
        module: "overview",
        actions: ["view", "export"],
      },
      {
        module: "devices",
        actions: ["view", "add", "edit", "delete", "control", "maintenance"],
      },
      {
        module: "alerts",
        actions: ["view", "manage", "configure", "acknowledge"],
      },
      {
        module: "analytics",
        actions: ["view", "export", "advanced"],
      },
      {
        module: "settings",
        actions: ["view", "edit", "system", "users", "security"],
      },
      {
        module: "help",
        actions: ["view", "support"],
      },
    ],
  },
  supervisor: {
    role: "supervisor",
    description: "Supervisory access with device control and alert management",
    permissions: [
      {
        module: "overview",
        actions: ["view", "export"],
      },
      {
        module: "devices",
        actions: ["view", "edit", "control", "maintenance"],
      },
      {
        module: "alerts",
        actions: ["view", "manage", "acknowledge"],
      },
      {
        module: "analytics",
        actions: ["view", "export"],
      },
      {
        module: "settings",
        actions: ["view", "edit"],
      },
      {
        module: "help",
        actions: ["view", "support"],
      },
    ],
  },
  technician: {
    role: "technician",
    description: "Technical access for device maintenance and troubleshooting",
    permissions: [
      {
        module: "overview",
        actions: ["view"],
      },
      {
        module: "devices",
        actions: ["view", "edit", "maintenance"],
      },
      {
        module: "alerts",
        actions: ["view", "acknowledge"],
      },
      {
        module: "analytics",
        actions: ["view"],
      },
      {
        module: "settings",
        actions: ["view"],
      },
      {
        module: "help",
        actions: ["view", "support"],
      },
    ],
  },
  operator: {
    role: "operator",
    description: "Operational access for monitoring and basic device control",
    permissions: [
      {
        module: "overview",
        actions: ["view"],
      },
      {
        module: "devices",
        actions: ["view", "control"],
      },
      {
        module: "alerts",
        actions: ["view", "acknowledge"],
      },
      {
        module: "analytics",
        actions: ["view"],
      },
      {
        module: "help",
        actions: ["view"],
      },
    ],
  },
  office_staff: {
    role: "office_staff",
    description: "Administrative access for reporting and documentation",
    permissions: [
      {
        module: "overview",
        actions: ["view", "export"],
      },
      {
        module: "devices",
        actions: ["view"],
      },
      {
        module: "alerts",
        actions: ["view"],
      },
      {
        module: "analytics",
        actions: ["view", "export"],
      },
      {
        module: "settings",
        actions: ["view"],
      },
      {
        module: "help",
        actions: ["view", "support"],
      },
    ],
  },
  quality_inspector: {
    role: "quality_inspector",
    description: "Quality control access for monitoring and inspection data",
    permissions: [
      {
        module: "overview",
        actions: ["view"],
      },
      {
        module: "devices",
        actions: ["view"],
      },
      {
        module: "alerts",
        actions: ["view", "acknowledge"],
      },
      {
        module: "analytics",
        actions: ["view", "export"],
      },
      {
        module: "help",
        actions: ["view"],
      },
    ],
  },
};

// Helper function to check if user has permission
export function hasPermission(
  userRole: UserRole,
  module: string,
  action: string,
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  if (!rolePermissions) return false;

  const modulePermissions = rolePermissions.permissions.find(
    (p) => p.module === module,
  );
  if (!modulePermissions) return false;

  return modulePermissions.actions.includes(action);
}

// Helper function to get all permissions for a role
export function getRolePermissions(userRole: UserRole): string[] {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  if (!rolePermissions) return [];

  const allPermissions: string[] = [];
  rolePermissions.permissions.forEach((module) => {
    module.actions.forEach((action) => {
      allPermissions.push(`${module.module}:${action}`);
    });
  });

  return allPermissions;
}

// User role display names
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  plant_manager: "Plant Manager",
  supervisor: "Supervisor",
  technician: "Technician",
  operator: "Operator",
  office_staff: "Office Staff",
  quality_inspector: "Quality Inspector",
};
