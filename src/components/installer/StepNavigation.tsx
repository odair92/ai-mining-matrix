
import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  language: 'en' | 'pt';
}

const StepNavigation: React.FC<StepNavigationProps> = ({ steps, currentStep, language }) => {
  return (
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
  );
};

export default StepNavigation;
