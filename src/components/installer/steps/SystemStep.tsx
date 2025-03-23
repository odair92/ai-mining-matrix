
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SystemSettings {
  siteName: string;
  cryptoSupport: boolean;
  debugMode: boolean;
}

interface SystemStepProps {
  language: 'en' | 'pt';
  systemSettings: SystemSettings;
  onSystemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onComplete: () => void;
  onPrev: () => void;
  isInstalling: boolean;
}

const SystemStep: React.FC<SystemStepProps> = ({
  language,
  systemSettings,
  onSystemChange,
  onComplete,
  onPrev,
  isInstalling
}) => {
  return (
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
            onChange={onSystemChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="cryptoSupport"
            name="cryptoSupport"
            checked={systemSettings.cryptoSupport}
            onChange={onSystemChange}
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
            onChange={onSystemChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="debugMode" className="cursor-pointer">
            {language === 'en' ? 'Enable Debug Mode' : 'Habilitar Modo de Depuração'}
          </Label>
        </div>
      </div>
      
      <div className="mt-auto flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          {language === 'en' ? 'Back' : 'Voltar'}
        </Button>
        <Button onClick={onComplete} disabled={isInstalling}>
          {isInstalling 
            ? (language === 'en' ? "Installing..." : "Instalando...") 
            : (language === 'en' ? "Complete Setup" : "Concluir Configuração")}
        </Button>
      </div>
    </div>
  );
};

export default SystemStep;
