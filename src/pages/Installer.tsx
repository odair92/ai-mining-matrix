
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Database, ShieldCheck, Server, UserPlus, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Install and configure AI Mining Matrix on your server.',
    icon: <Server className="h-6 w-6" />,
  },
  {
    id: 'admin',
    title: 'Admin Setup',
    description: 'Create your administrator account.',
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Configure your system database.',
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: 'system',
    title: 'System Settings',
    description: 'Configure mining capabilities and performance.',
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    id: 'complete',
    title: 'Installation Complete',
    description: 'Your system is ready to use.',
    icon: <Check className="h-6 w-6" />,
  },
];

const Installer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [adminUser, setAdminUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [dbConfig, setDbConfig] = useState({ host: 'localhost', name: 'aimatrix', user: 'root', password: '' });
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'AI Mining Matrix',
    cryptoSupport: true,
    debugMode: false,
  });
  const [isInstalling, setIsInstalling] = useState(false);

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminUser(prev => ({ ...prev, [name]: value }));
  };

  const handleDbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    // Form validation
    if (currentStep === 1) {
      if (!adminUser.email || !adminUser.password) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields.",
          variant: "destructive",
        });
        return;
      }

      if (adminUser.password !== adminUser.confirmPassword) {
        toast({
          title: "Password mismatch",
          description: "The passwords you entered do not match.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeInstallation = () => {
    setIsInstalling(true);

    // Simulating installation process
    setTimeout(() => {
      // Save admin password to localStorage
      localStorage.setItem('adminPassword', adminUser.password);
      localStorage.setItem('systemInstalled', 'true');
      
      setIsInstalling(false);
      setCurrentStep(steps.length - 1);
    }, 2000);
  };

  const finishInstallation = () => {
    toast({
      title: "Installation complete!",
      description: "Your AI Mining Matrix has been successfully set up.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">AI Mining Matrix Installer</h1>
          <p className="text-muted-foreground">Setup your AI-powered mining platform in minutes</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Side navigation */}
          <div className="md:w-64 shrink-0">
            <GlassMorphism className="p-4">
              <div className="space-y-1">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center p-3 rounded-md transition-colors ${
                      currentStep === index
                        ? 'bg-primary/10 text-primary'
                        : currentStep > index
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/50'
                    }`}
                  >
                    <div className={`mr-3 ${currentStep === index ? 'text-primary' : ''}`}>
                      {currentStep > index ? (
                        <div className="bg-primary/20 p-1 rounded-full">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${currentStep === index ? 'text-primary' : ''}`}>
                        {step.title}
                      </p>
                      <p className="text-xs hidden md:block">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassMorphism>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <GlassMorphism className="p-6 h-full">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {/* Welcome step */}
                {currentStep === 0 && (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Welcome to AI Mining Matrix</h2>
                    <p className="mb-4">
                      This installer will guide you through the process of setting up your AI Mining Matrix application.
                    </p>
                    <p className="mb-4">
                      Before you begin, please make sure you have:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-6">
                      <li>A modern web browser</li>
                      <li>Administrator access to your server</li>
                      <li>Database credentials (if using an external database)</li>
                    </ul>
                    <p className="text-muted-foreground">
                      Click "Next" to start the installation process.
                    </p>
                    <div className="mt-auto flex justify-end">
                      <Button onClick={nextStep}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Admin setup step */}
                {currentStep === 1 && (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Create Admin Account</h2>
                    <p className="mb-6">
                      Create your administrator account to manage the platform.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={adminUser.email}
                          onChange={handleAdminChange}
                          placeholder="admin@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Admin Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={adminUser.password}
                          onChange={handleAdminChange}
                          placeholder="Enter a secure password"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={adminUser.confirmPassword}
                          onChange={handleAdminChange}
                          placeholder="Confirm your password"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button onClick={nextStep}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Database setup step */}
                {currentStep === 2 && (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Database Configuration</h2>
                    <p className="mb-6">
                      Configure the database settings for your application.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="host">Database Host</Label>
                        <Input
                          id="host"
                          name="host"
                          value={dbConfig.host}
                          onChange={handleDbChange}
                          placeholder="localhost"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="name">Database Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={dbConfig.name}
                          onChange={handleDbChange}
                          placeholder="aimatrix"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="user">Database User</Label>
                        <Input
                          id="user"
                          name="user"
                          value={dbConfig.user}
                          onChange={handleDbChange}
                          placeholder="root"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dbPassword">Database Password</Label>
                        <Input
                          id="dbPassword"
                          name="password"
                          type="password"
                          value={dbConfig.password}
                          onChange={handleDbChange}
                          placeholder="Enter database password"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button onClick={nextStep}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* System settings step */}
                {currentStep === 3 && (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">System Configuration</h2>
                    <p className="mb-6">
                      Configure your system settings and mining capabilities.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          name="siteName"
                          value={systemSettings.siteName}
                          onChange={handleSystemChange}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="cryptoSupport"
                          name="cryptoSupport"
                          checked={systemSettings.cryptoSupport}
                          onChange={handleSystemChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="cryptoSupport" className="cursor-pointer">Enable Cryptocurrency Support</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="debugMode"
                          name="debugMode"
                          checked={systemSettings.debugMode}
                          onChange={handleSystemChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="debugMode" className="cursor-pointer">Enable Debug Mode</Label>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button onClick={completeInstallation} disabled={isInstalling}>
                        {isInstalling ? "Installing..." : "Complete Setup"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Completion step */}
                {currentStep === 4 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-6">
                      <Check className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Installation Complete!</h2>
                    <p className="mb-6">
                      Your AI Mining Matrix application has been successfully installed and configured.
                    </p>
                    <p className="mb-8">
                      You can now log in to your admin panel with the credentials you provided during setup.
                    </p>
                    
                    <Button onClick={finishInstallation} className="px-8">
                      Go to Homepage
                    </Button>
                  </div>
                )}
              </motion.div>
            </GlassMorphism>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Installer;
