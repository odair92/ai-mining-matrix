
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Mining from "./pages/Mining";
import Plans from "./pages/Plans";
import Admin from "./pages/Admin";
import Installer from "./pages/Installer";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if system is installed
    const systemInstalled = localStorage.getItem('systemInstalled');
    setIsInstalled(systemInstalled === 'true');
  }, []);

  // Wait until we know if the system is installed
  if (isInstalled === null) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {!isInstalled ? (
                <>
                  <Route path="/installer" element={<Installer />} />
                  <Route path="*" element={<Navigate to="/installer" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mining" element={<Mining />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/installer" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
