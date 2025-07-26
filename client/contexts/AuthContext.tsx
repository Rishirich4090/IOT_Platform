import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserRole, ROLE_DISPLAY_NAMES } from "../types/permissions";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  employeeId?: string;
  shift?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      const storedUser = localStorage.getItem("iot_user");
      const sessionToken = localStorage.getItem("iot_session_token");

      if (storedUser && sessionToken) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("iot_user");
          localStorage.removeItem("iot_session_token");
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo authentication with different user roles
      const demoUsers: User[] = [
        {
          id: "user_1",
          name: "Rishi Raj",
          email: "rishi.raj@manufacturiot.com",
          role: "plant_manager",
          department: "Management",
          employeeId: "EMP001",
          shift: "Day",
          avatar: undefined,
        },
        {
          id: "user_2",
          name: "Sarah Wilson",
          email: "sarah.wilson@manufacturiot.com",
          role: "supervisor",
          department: "Production",
          employeeId: "EMP002",
          shift: "Day",
          avatar: undefined,
        },
        {
          id: "user_3",
          name: "Mike Chen",
          email: "mike.chen@manufacturiot.com",
          role: "technician",
          department: "Maintenance",
          employeeId: "EMP003",
          shift: "Day",
          avatar: undefined,
        },
        {
          id: "user_4",
          name: "Lisa Garcia",
          email: "lisa.garcia@manufacturiot.com",
          role: "operator",
          department: "Production",
          employeeId: "EMP004",
          shift: "Night",
          avatar: undefined,
        },
        {
          id: "user_5",
          name: "David Park",
          email: "david.park@manufacturiot.com",
          role: "office_staff",
          department: "Administration",
          employeeId: "EMP005",
          shift: "Day",
          avatar: undefined,
        },
        {
          id: "user_6",
          name: "Anna Martinez",
          email: "anna.martinez@manufacturiot.com",
          role: "quality_inspector",
          department: "Quality Control",
          employeeId: "EMP006",
          shift: "Day",
          avatar: undefined,
        },
      ];

      // Simple password for all demo users (in real app, each would have unique passwords)
      const demoPassword = "demo123";

      if (credentials.email && credentials.password === demoPassword) {
        const userData = demoUsers.find(
          (user) => user.email === credentials.email,
        );

        if (userData) {
          setUser(userData);

          // Store session data
          const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          if (credentials.rememberMe) {
            localStorage.setItem("iot_user", JSON.stringify(userData));
            localStorage.setItem("iot_session_token", sessionToken);
          } else {
            sessionStorage.setItem("iot_user", JSON.stringify(userData));
            sessionStorage.setItem("iot_session_token", sessionToken);
          }

          return true;
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);

    // Clear all stored session data
    localStorage.removeItem("iot_user");
    localStorage.removeItem("iot_session_token");
    sessionStorage.removeItem("iot_user");
    sessionStorage.removeItem("iot_session_token");

    // In a real app, you might also call an API to invalidate the session
    console.log("User logged out successfully");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
