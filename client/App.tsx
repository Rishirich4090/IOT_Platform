import "./global.css";

// Completely suppress Recharts defaultProps warnings at the React level
const originalWarn = console.warn;
const originalError = console.error;

// Override console.warn to filter out defaultProps warnings
console.warn = function (...args) {
  // Check all arguments for defaultProps warning patterns
  const allArgs = Array.from(args).map((arg) => String(arg || ""));
  const fullMessage = allArgs.join(" ");

  // Multiple patterns to catch React's warning formats
  const suppressPatterns = [
    "Support for defaultProps will be removed from function components",
    "defaultProps will be removed",
    "XAxis",
    "YAxis",
    "CartesianGrid",
    "Tooltip",
    "ResponsiveContainer",
  ];

  // If any pattern matches, suppress the warning
  const shouldSuppress = suppressPatterns.some(
    (pattern) =>
      fullMessage.includes(pattern) && fullMessage.includes("defaultProps"),
  );

  if (shouldSuppress) {
    return; // Completely suppress
  }

  // Allow other warnings through
  originalWarn.apply(this, args);
};

// Override console.error for defaultProps errors
console.error = function (...args) {
  const allArgs = Array.from(args).map((arg) => String(arg || ""));
  const fullMessage = allArgs.join(" ");

  if (
    fullMessage.includes("defaultProps") &&
    fullMessage.includes("Support for")
  ) {
    return; // Suppress defaultProps errors
  }

  originalError.apply(this, args);
};

// Also try to suppress at the React DevTools level if available
if (typeof window !== "undefined" && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.onCommitFiberRoot) {
    const originalOnCommitFiberRoot = hook.onCommitFiberRoot;
    hook.onCommitFiberRoot = function (...args) {
      try {
        return originalOnCommitFiberRoot.apply(this, args);
      } catch (error) {
        // Suppress any errors during commit that might be related to defaultProps
        if (String(error).includes("defaultProps")) {
          return;
        }
        throw error;
      }
    };
  }
}

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Overview } from "./pages/Overview";
import { Devices } from "./pages/Devices";
import { Alerts } from "./pages/Alerts";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { Help } from "./pages/Help";
import { Login } from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function AuthenticatedApp() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
