
import React from 'react';
import { AlertCircle } from 'lucide-react';

const InfoBanner: React.FC = () => {
  return (
    <div className="bg-primary/10 text-primary px-4 py-2 text-sm rounded-lg flex items-center gap-2 mb-4">
      <AlertCircle className="h-4 w-4" />
      <span>
        Versão de demonstração: Utilizando armazenamento local do navegador. Para uso em produção, configure um banco de dados real.
      </span>
    </div>
  );
};

export default InfoBanner;
