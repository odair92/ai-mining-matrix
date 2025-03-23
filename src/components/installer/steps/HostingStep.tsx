
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

interface HostingConfig {
  baseUrl: string;
  useHttps: boolean;
  apiPath: string;
  assetsPath: string;
}

interface HostingStepProps {
  language: 'en' | 'pt';
  hostingConfig: HostingConfig;
  onHostingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const HostingStep: React.FC<HostingStepProps> = ({
  language,
  hostingConfig,
  onHostingChange,
  onNext,
  onPrev
}) => {
  return (
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
            onChange={onHostingChange}
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
            onChange={onHostingChange}
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
            onChange={onHostingChange}
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
            onChange={onHostingChange}
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
        <Button variant="outline" onClick={onPrev}>
          {language === 'en' ? 'Back' : 'Voltar'}
        </Button>
        <Button onClick={onNext}>
          {language === 'en' ? 'Next' : 'Próximo'} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HostingStep;
