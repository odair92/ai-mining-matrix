
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  language: 'en' | 'pt';
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ language, onNext }) => {
  return (
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
        <Button onClick={onNext}>
          {language === 'en' ? 'Next' : 'Próximo'} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
