import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Database, ShieldCheck, Server, Cpu, Globe, FileText, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import HostingerGuide from '@/components/installer/HostingerGuide';
import HostingerGuidePortugues from '@/components/installer/HostingerGuidePortugues';

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
    id: 'hosting',
    title: 'Hosting',
    description: 'Configure hosting environment settings.',
    icon: <Globe className="h-6 w-6" />,
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

    setTimeout(() => {
      localStorage.setItem('adminPassword', adminUser.password);
      localStorage.setItem('adminEmail', adminUser.email);
      localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
      localStorage.setItem('hostingConfig', JSON.stringify(hostingConfig));
      localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
      localStorage.setItem('systemInstalled', 'true');
      localStorage.setItem('installationDate', new Date().toISOString());
      
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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pt' : 'en');
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
            <Button 
              variant="outline" 
              onClick={() => setShowHostingerGuide(true)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {language === 'en' ? 'Hostinger Installation Guide' : 'Guia de Instalação Hostinger'}
            </Button>
            <Button 
              variant="outline" 
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'Português' : 'English'}
            </Button>
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
                          {language === 'en' ? step.title : 
                            step.id === 'welcome' ? 'Bem-vindo' :
                            step.id === 'admin' ? 'Config. Admin' :
                            step.id === 'database' ? 'Banco de Dados' :
                            step.id === 'hosting' ? 'Hospedagem' :
                            step.id === 'system' ? 'Configurações' :
                            step.id === 'complete' ? 'Concluído' : step.title
                          }
                        </p>
                        <p className="text-xs hidden md:block">
                          {language === 'en' ? step.description : 
                            step.id === 'welcome' ? 'Instale e configure o AI Mining Matrix no seu servidor.' :
                            step.id === 'admin' ? 'Crie sua conta de administrador.' :
                            step.id === 'database' ? 'Configure o banco de dados do sistema.' :
                            step.id === 'hosting' ? 'Configure as definições do ambiente de hospedagem.' :
                            step.id === 'system' ? 'Configure recursos de mineração e desempenho.' :
                            step.id === 'complete' ? 'Seu sistema está pronto para usar.' : step.description
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
                  {currentStep === 0 && (
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'Welcome to AI Mining Matrix' : 'Bem-vindo ao AI Mining Matrix'}
                      </h2>
                      <p className="mb-4">
                        {language === 'en' 
                          ? 'This installer will guide you through the process of setting up your AI Mining Matrix application.'
                          : 'Este instalador irá guiá-lo através do processo de configuração da sua aplicação AI Mining Matrix.'}
                      </p>
                      <p className="mb-4">
                        {language === 'en'
                          ? 'Before you begin, please make sure you have:'
                          : 'Antes de começar, certifique-se de que você tem:'}
                      </p>
                      <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>{language === 'en' ? 'A modern web browser' : 'Um navegador web moderno'}</li>
                        <li>{language === 'en' ? 'Administrator access to your server' : 'Acesso de administrador ao seu servidor'}</li>
                        <li>{language === 'en' ? 'Database credentials (if using an external database)' : 'Credenciais do banco de dados (se estiver usando um banco de dados externo)'}</li>
                      </ul>
                      <p className="text-muted-foreground">
                        {language === 'en'
                          ? 'Click "Next" to start the installation process.'
                          : 'Clique em "Próximo" para iniciar o processo de instalação.'}
                      </p>
                      <div className="mt-auto flex justify-end">
                        <Button onClick={nextStep}>
                          {language === 'en' ? 'Next' : 'Próximo'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'Create Admin Account' : 'Criar Conta de Administrador'}
                      </h2>
                      <p className="mb-6">
                        {language === 'en'
                          ? 'Create your administrator account to manage the platform.'
                          : 'Crie sua conta de administrador para gerenciar a plataforma.'}
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'Endereço de Email'}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={adminUser.email}
                            onChange={handleAdminChange}
                            placeholder={language === 'en' ? "admin@example.com" : "admin@exemplo.com"}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="password">{language === 'en' ? 'Admin Password' : 'Senha de Administrador'}</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={adminUser.password}
                            onChange={handleAdminChange}
                            placeholder={language === 'en' ? "Enter a secure password" : "Digite uma senha segura"}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword">{language === 'en' ? 'Confirm Password' : 'Confirmar Senha'}</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={adminUser.confirmPassword}
                            onChange={handleAdminChange}
                            placeholder={language === 'en' ? "Confirm your password" : "Confirme sua senha"}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-auto flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          {language === 'en' ? 'Back' : 'Voltar'}
                        </Button>
                        <Button onClick={nextStep}>
                          {language === 'en' ? 'Next' : 'Próximo'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'Database Configuration' : 'Configuração do Banco de Dados'}
                      </h2>
                      <p className="mb-6">
                        {language === 'en'
                          ? 'Configure the database settings for your application.'
                          : 'Configure as configurações do banco de dados para sua aplicação.'}
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="host">{language === 'en' ? 'Database Host' : 'Host do Banco de Dados'}</Label>
                          <Input
                            id="host"
                            name="host"
                            value={dbConfig.host}
                            onChange={handleDbChange}
                            placeholder="localhost"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="name">{language === 'en' ? 'Database Name' : 'Nome do Banco de Dados'}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={dbConfig.name}
                            onChange={handleDbChange}
                            placeholder="aimatrix"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="user">{language === 'en' ? 'Database User' : 'Usuário do Banco de Dados'}</Label>
                          <Input
                            id="user"
                            name="user"
                            value={dbConfig.user}
                            onChange={handleDbChange}
                            placeholder="root"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="dbPassword">{language === 'en' ? 'Database Password' : 'Senha do Banco de Dados'}</Label>
                          <Input
                            id="dbPassword"
                            name="password"
                            type="password"
                            value={dbConfig.password}
                            onChange={handleDbChange}
                            placeholder={language === 'en' ? "Enter database password" : "Digite a senha do banco de dados"}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-auto flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          {language === 'en' ? 'Back' : 'Voltar'}
                        </Button>
                        <Button onClick={nextStep}>
                          {language === 'en' ? 'Next' : 'Próximo'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'Hosting Configuration' : 'Configuração de Hospedagem'}
                      </h2>
                      <p className="mb-6">
                        {language === 'en'
                          ? 'Configure hosting environment settings for your application.'
                          : 'Configure as definições do ambiente de hospedagem para sua aplicação.'}
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="baseUrl">{language === 'en' ? 'Base URL' : 'URL Base'}</Label>
                          <Input
                            id="baseUrl"
                            name="baseUrl"
                            value={hostingConfig.baseUrl}
                            onChange={handleHostingChange}
                            placeholder="https://seudominio.com"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {language === 'en'
                              ? 'The root URL where your application is hosted'
                              : 'A URL raiz onde sua aplicação está hospedada'}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="useHttps"
                            name="useHttps"
                            checked={hostingConfig.useHttps}
                            onChange={handleHostingChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="useHttps" className="cursor-pointer">
                            {language === 'en' ? 'Use HTTPS' : 'Usar HTTPS'}
                          </Label>
                        </div>
                        
                        <div>
                          <Label htmlFor="apiPath">{language === 'en' ? 'API Path' : 'Caminho da API'}</Label>
                          <Input
                            id="apiPath"
                            name="apiPath"
                            value={hostingConfig.apiPath}
                            onChange={handleHostingChange}
                            placeholder="/api"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {language === 'en'
                              ? 'The path to API endpoints'
                              : 'O caminho para os endpoints da API'}
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="assetsPath">{language === 'en' ? 'Assets Path' : 'Caminho dos Recursos'}</Label>
                          <Input
                            id="assetsPath"
                            name="assetsPath"
                            value={hostingConfig.assetsPath}
                            onChange={handleHostingChange}
                            placeholder="/assets"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {language === 'en'
                              ? 'The path to static assets'
                              : 'O caminho para recursos estáticos'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-auto flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          {language === 'en' ? 'Back' : 'Voltar'}
                        </Button>
                        <Button onClick={nextStep}>
                          {language === 'en' ? 'Next' : 'Próximo'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'System Configuration' : 'Configuração do Sistema'}
                      </h2>
                      <p className="mb-6">
                        {language === 'en'
                          ? 'Configure your system settings and mining capabilities.'
                          : 'Configure as definições do sistema e recursos de mineração.'}
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="siteName">{language === 'en' ? 'Site Name' : 'Nome do Site'}</Label>
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
                          <Label htmlFor="cryptoSupport" className="cursor-pointer">
                            {language === 'en' ? 'Enable Cryptocurrency Support' : 'Habilitar Suporte a Criptomoedas'}
                          </Label>
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
                          <Label htmlFor="debugMode" className="cursor-pointer">
                            {language === 'en' ? 'Enable Debug Mode' : 'Habilitar Modo de Depuração'}
                          </Label>
                        </div>
                      </div>
                      
                      <div className="mt-auto flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          {language === 'en' ? 'Back' : 'Voltar'}
                        </Button>
                        <Button onClick={completeInstallation} disabled={isInstalling}>
                          {isInstalling 
                            ? (language === 'en' ? "Installing..." : "Instalando...") 
                            : (language === 'en' ? "Complete Setup" : "Concluir Configuração")}
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-6">
                        <Check className="h-10 w-10 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'Installation Complete!' : 'Instalação Concluída!'}
                      </h2>
                      <p className="mb-6">
                        {language === 'en'
                          ? 'Your AI Mining Matrix application has been successfully installed and configured.'
                          : 'Sua aplicação AI Mining Matrix foi instalada e configurada com sucesso.'}
                      </p>
                      <p className="mb-8">
                        {language === 'en'
                          ? 'You can now log in to your admin panel with the credentials you provided during setup.'
                          : 'Agora você pode fazer login no seu painel de administração com as credenciais que forneceu durante a configuração.'}
                      </p>
                      
                      <Button onClick={finishInstallation} className="px-8">
                        {language === 'en' ? 'Go to Homepage' : 'Ir para Página Inicial'}
                      </Button>
                    </div>
                  )}
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
