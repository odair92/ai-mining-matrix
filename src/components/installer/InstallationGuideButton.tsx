
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface InstallationGuideButtonProps {
  language: 'en' | 'pt';
  onClick: () => void;
}

const InstallationGuideButton: React.FC<InstallationGuideButtonProps> = ({ language, onClick }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <FileText className="h-4 w-4" />
      {language === 'en' ? 'Hostinger Installation Guide' : 'Guia de Instalação Hostinger'}
    </Button>
  );
};

export default InstallationGuideButton;
