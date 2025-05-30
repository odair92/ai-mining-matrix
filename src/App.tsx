
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Mining from "./pages/Mining";
import Plans from "./pages/Plans";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(false);

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    const adminAuthTime = localStorage.getItem('adminAuthTime');
    
    // Pre-set default admin credentials if none exist
    if (!localStorage.getItem('adminEmail')) {
      localStorage.setItem('adminEmail', 'admin@aimatrix.com');
      localStorage.setItem('adminPassword', 'admin123');
      localStorage.setItem('systemSettings', JSON.stringify({
        siteName: 'AI Mining Matrix',
        cryptoSupport: true,
        debugMode: false,
      }));
    }
    
    // Validate admin authentication with time check (24 hour session)
    if (adminAuthenticated === 'true' && adminAuthTime) {
      const authTimeMs = parseInt(adminAuthTime, 10);
      const currentTime = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      
      if (!isNaN(authTimeMs) && (currentTime - authTimeMs) < oneDayMs) {
        setIsAdminAuth(true);
      } else {
        // Clear expired auth
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminAuthTime');
      }
    } else {
      setIsAdminAuth(false);
    }
  }, []);

  // Listen for storage changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminAuthenticated' || e.key === 'adminAuthTime') {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mining" element={<Mining />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
