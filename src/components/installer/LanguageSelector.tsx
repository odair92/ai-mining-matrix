
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'en' | 'pt';
  toggleLanguage: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, toggleLanguage }) => {
  return (
    <Button 
      variant="outline" 
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'en' ? 'Português' : 'English'}
    </Button>
  );
};

export default LanguageSelector;
