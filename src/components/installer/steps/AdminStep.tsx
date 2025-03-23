
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

interface AdminUser {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AdminStepProps {
  language: 'en' | 'pt';
  adminUser: AdminUser;
  onAdminChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AdminStep: React.FC<AdminStepProps> = ({ 
  language, 
  adminUser, 
  onAdminChange, 
  onNext, 
  onPrev 
}) => {
  return (
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
            onChange={onAdminChange}
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
            onChange={onAdminChange}
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
            onChange={onAdminChange}
            placeholder={language === 'en' ? "Confirm your password" : "Confirme sua senha"}
            required
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

export default AdminStep;
