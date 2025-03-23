
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import HostingerGuide from '@/components/installer/HostingerGuide';
import HostingerGuidePortugues from '@/components/installer/HostingerGuidePortugues';
import StepNavigation from '@/components/installer/StepNavigation';
import LanguageSelector from '@/components/installer/LanguageSelector';
import InstallationGuideButton from '@/components/installer/InstallationGuideButton';
import { installationSteps } from '@/components/installer/constants';

// Step components
import WelcomeStep from '@/components/installer/steps/WelcomeStep';
import AdminStep from '@/components/installer/steps/AdminStep';
import DatabaseStep from '@/components/installer/steps/DatabaseStep';
import HostingStep from '@/components/installer/steps/HostingStep';
import SystemStep from '@/components/installer/steps/SystemStep';
import CompleteStep from '@/components/installer/steps/CompleteStep';

const Installer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [adminUser, setAdminUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [dbConfig, setDbConfig] = useState({ host: 'localhost', name: 'aimatrix', user: 'root', password: '' });
  const [hostingConfig, setHostingConfig] = useState({
    baseUrl: window.location.origin,
    useHttps: window.location.protocol === 'https:',
    apiPath: '/api',
    assetsPath: '/assets',
  });
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'AI Mining Matrix',
    cryptoSupport: true,
    debugMode: false,
  });
  const [isInstalling, setIsInstalling] = useState(false);
  const [showHostingerGuide, setShowHostingerGuide] = useState(false);
  const [language, setLanguage] = useState<'en' | 'pt'>('en');

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminUser(prev => ({ ...prev, [name]: value }));
  };

  const handleDbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleHostingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setHostingConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
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

    if (currentStep < installationSteps.length - 1) {
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

    setTimeout(() => {
      localStorage.setItem('adminPassword', adminUser.password);
      localStorage.setItem('adminEmail', adminUser.email);
      localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
      localStorage.setItem('hostingConfig', JSON.stringify(hostingConfig));
      localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
      localStorage.setItem('systemInstalled', 'true');
      localStorage.setItem('installationDate', new Date().toISOString());
      
      setIsInstalling(false);
      setCurrentStep(installationSteps.length - 1);
    }, 2000);
  };

  const finishInstallation = () => {
    toast({
      title: "Installation complete!",
      description: "Your AI Mining Matrix has been successfully set up.",
    });
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pt' : 'en');
  };

  // Render the current step component
  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return <WelcomeStep language={language} onNext={nextStep} />;
      case 1:
        return (
          <AdminStep 
            language={language} 
            adminUser={adminUser} 
            onAdminChange={handleAdminChange} 
            onNext={nextStep} 
            onPrev={prevStep} 
          />
        );
      case 2:
        return (
          <DatabaseStep 
            language={language} 
            dbConfig={dbConfig} 
            onDbChange={handleDbChange} 
            onNext={nextStep} 
            onPrev={prevStep} 
          />
        );
      case 3:
        return (
          <HostingStep 
            language={language} 
            hostingConfig={hostingConfig} 
            onHostingChange={handleHostingChange} 
            onNext={nextStep} 
            onPrev={prevStep} 
          />
        );
      case 4:
        return (
          <SystemStep 
            language={language} 
            systemSettings={systemSettings} 
            onSystemChange={handleSystemChange} 
            onComplete={completeInstallation} 
            onPrev={prevStep} 
            isInstalling={isInstalling} 
          />
        );
      case 5:
        return <CompleteStep language={language} onFinish={finishInstallation} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            {language === 'en' ? 'AI Mining Matrix Installer' : 'Instalador AI Mining Matrix'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Setup your AI-powered mining platform in minutes' 
              : 'Configure sua plataforma de mineração com IA em minutos'}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <InstallationGuideButton 
              language={language} 
              onClick={() => setShowHostingerGuide(true)} 
            />
            <LanguageSelector 
              language={language} 
              toggleLanguage={toggleLanguage} 
            />
          </div>
        </header>

        {showHostingerGuide ? (
          language === 'en' ? (
            <HostingerGuide onClose={() => setShowHostingerGuide(false)} />
          ) : (
            <HostingerGuidePortugues onClose={() => setShowHostingerGuide(false)} />
          )
        ) : (
          <div className="flex flex-col md:flex-row gap-8 flex-1">
            <div className="md:w-64 shrink-0">
              <GlassMorphism className="p-4">
                <StepNavigation 
                  steps={installationSteps} 
                  currentStep={currentStep} 
                  language={language} 
                />
              </GlassMorphism>
            </div>

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
                  {renderStepContent()}
                </motion.div>
              </GlassMorphism>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Installer;
