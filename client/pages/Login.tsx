import React, { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Cpu,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface LoginProps {
  onLogin: (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "rishi.raj@manufacturiot.com",
    password: "demo123",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      const success = await onLogin(formData);
      if (!success) {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user types
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Cpu className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              ManufactureIoT
            </h1>
          </div>
          <p className="text-muted-foreground">
            Sign in to access your manufacturing dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="metric-card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-iot-error/10 border border-iot-error/20 rounded-lg text-iot-error">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    updateFormData("rememberMe", e.target.checked)
                  }
                  className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-iot-blue-500/10 border border-iot-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-iot-blue-500" />
              <span className="text-sm font-medium text-iot-blue-500">
                Demo User Accounts
              </span>
            </div>
            <div className="text-xs text-muted-foreground space-y-2">
              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground">
                    Plant Manager (Full Access)
                  </p>
                  <p className="text-iot-blue-500">
                    rishi.raj@manufacturiot.com
                  </p>
                </div>
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground">Supervisor</p>
                  <p className="text-iot-blue-500">
                    sarah.wilson@manufacturiot.com
                  </p>
                </div>
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground">Technician</p>
                  <p className="text-iot-blue-500">
                    mike.chen@manufacturiot.com
                  </p>
                </div>
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground">Operator</p>
                  <p className="text-iot-blue-500">
                    lisa.garcia@manufacturiot.com
                  </p>
                </div>
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground">Office Staff</p>
                  <p className="text-iot-blue-500">
                    david.park@manufacturiot.com
                  </p>
                </div>
                <div className="p-2 bg-card rounded border">
                  <p className="font-medium text-foreground">
                    Quality Inspector
                  </p>
                  <p className="text-iot-blue-500">
                    anna.martinez@manufacturiot.com
                  </p>
                </div>
              </div>
              <p className="text-center mt-3">
                <strong>Password for all:</strong> demo123
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Secured with enterprise-grade encryption</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 ManufactureIoT. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <button className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
