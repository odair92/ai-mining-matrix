
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useNavigate } from 'react-router-dom';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Get stored admin credentials
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
    
    setTimeout(() => {
      if (password === storedPassword) {
        // Store auth state in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao painel de administração.",
        });
        
        onLoginSuccess();
      } else {
        toast({
          title: "Falha na autenticação",
          description: "A senha que você inseriu está incorreta.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassMorphism className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Acesso de Administrador</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha de administrador"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Autenticando..." : "Entrar no Painel de Admin"}
            </Button>
          </form>
        </GlassMorphism>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
