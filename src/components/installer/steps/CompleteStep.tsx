
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface CompleteStepProps {
  language: 'en' | 'pt';
  onFinish: () => void;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ language, onFinish }) => {
  return (
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
      
      <Button onClick={onFinish} className="px-8">
        {language === 'en' ? 'Go to Homepage' : 'Ir para Página Inicial'}
      </Button>
    </div>
  );
};

export default CompleteStep;
