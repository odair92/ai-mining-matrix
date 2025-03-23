
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

interface DbConfig {
  host: string;
  name: string;
  user: string;
  password: string;
}

interface DatabaseStepProps {
  language: 'en' | 'pt';
  dbConfig: DbConfig;
  onDbChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DatabaseStep: React.FC<DatabaseStepProps> = ({
  language,
  dbConfig,
  onDbChange,
  onNext,
  onPrev
}) => {
  return (
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
            onChange={onDbChange}
            placeholder="localhost"
          />
        </div>
        
        <div>
          <Label htmlFor="name">{language === 'en' ? 'Database Name' : 'Nome do Banco de Dados'}</Label>
          <Input
            id="name"
            name="name"
            value={dbConfig.name}
            onChange={onDbChange}
            placeholder="aimatrix"
          />
        </div>
        
        <div>
          <Label htmlFor="user">{language === 'en' ? 'Database User' : 'Usuário do Banco de Dados'}</Label>
          <Input
            id="user"
            name="user"
            value={dbConfig.user}
            onChange={onDbChange}
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
            onChange={onDbChange}
            placeholder={language === 'en' ? "Enter database password" : "Digite a senha do banco de dados"}
          />
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

export default DatabaseStep;
