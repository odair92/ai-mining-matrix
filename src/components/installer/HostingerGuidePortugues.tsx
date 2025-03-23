
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCopy, FileDown, FileCode, Globe, Server, Database, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';

interface HostingerGuidePortuguesProps {
  onClose: () => void;
}

const HostingerGuidePortugues: React.FC<HostingerGuidePortuguesProps> = ({ onClose }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado para área de transferência",
      description: "Texto foi copiado para sua área de transferência"
    });
  };

  return (
    <GlassMorphism className="max-w-4xl mx-auto p-6 overflow-y-auto max-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Guia de Instalação na Hostinger</h2>
        <Button variant="ghost" onClick={onClose}>Fechar</Button>
      </div>

      <div className="space-y-8">
        {/* Introdução */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Visão Geral</h3>
          <p className="mb-2">
            Este guia irá ajudá-lo a instalar o AI Mining Matrix na hospedagem Hostinger. Siga esses passos cuidadosamente para garantir uma instalação bem-sucedida.
          </p>
        </section>

        {/* Passo 1 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Passo 1: Prepare sua Conta Hostinger</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Faça login na sua conta Hostinger e acesse o painel de controle de hospedagem (hPanel)</p>
            <p>2. Certifique-se de que você tem um nome de domínio conectado à sua conta de hospedagem</p>
            <p>3. Anote as seguintes informações que você precisará durante a instalação:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Seu nome de domínio (ex: seudominio.com)</li>
              <li>Detalhes de login FTP/Gerenciador de Arquivos</li>
              <li>Nome do banco de dados MySQL, nome de usuário e senha</li>
            </ul>
          </div>
        </section>

        {/* Passo 2 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Passo 2: Criar um Banco de Dados MySQL</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. No hPanel, vá para "Bancos de dados" → "Bancos de dados MySQL"</p>
            <p>2. Crie um novo banco de dados inserindo um nome (ex: "aimatrix")</p>
            <p>3. Crie um novo usuário de banco de dados e atribua uma senha forte</p>
            <p>4. Adicione o usuário ao banco de dados com "Todos os Privilégios"</p>
            <p>5. Salve o nome do banco de dados, nome de usuário e senha para o processo de instalação</p>
          </div>
        </section>

        {/* Passo 3 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <FileDown className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Passo 3: Enviar Arquivos para Hostinger</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Faça o download do pacote AI Mining Matrix do site oficial</p>
            <p>2. Extraia o pacote no seu computador local</p>
            <p>3. No hPanel, vá para "Arquivos" → "Gerenciador de Arquivos"</p>
            <p>4. Navegue até o diretório public_html (ou o diretório onde deseja instalar)</p>
            <p>5. Faça upload de todos os arquivos do pacote extraído para este diretório</p>
            <p className="text-sm text-muted-foreground mt-2">
              Alternativamente, você pode usar um software FTP como FileZilla para fazer upload dos arquivos:
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm mt-1">
              <p>Host: ftp.seudominio.com</p>
              <p>Usuário: Seu nome de usuário Hostinger</p>
              <p>Senha: Sua senha Hostinger</p>
              <p>Porta: 21</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => copyToClipboard("Host: ftp.seudominio.com\nUsuário: Seu nome de usuário Hostinger\nSenha: Sua senha Hostinger\nPorta: 21")}
              >
                <ClipboardCopy className="h-3.5 w-3.5 mr-1" /> Copiar
              </Button>
            </div>
          </div>
        </section>

        {/* Passo 4 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <FileCode className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Passo 4: Configurar o .htaccess</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. No Gerenciador de Arquivos, verifique se o arquivo .htaccess existe no diretório raiz</p>
            <p>2. Se não existir, crie um novo arquivo chamado .htaccess</p>
            <p>3. Copie e cole o seguinte código no arquivo .htaccess:</p>
            <div className="bg-muted/50 p-3 rounded-md text-sm relative mt-1">
              <pre className="whitespace-pre-wrap">
{`# Arquivo de configuração Apache para SPA
# Isso habilita o roteamento adequado para aplicações de página única

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Se a requisição não for para um arquivo ou diretório, redirecione para index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Habilitar CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
  Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
</IfModule>

# Configurar controle de cache
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Imagens
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # Fontes da web
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # CSS e JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`}
              </pre>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => copyToClipboard(`# Arquivo de configuração Apache para SPA
# Isso habilita o roteamento adequado para aplicações de página única

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Se a requisição não for para um arquivo ou diretório, redirecione para index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Habilitar CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
  Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
</IfModule>

# Configurar controle de cache
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Imagens
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # Fontes da web
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # CSS e JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`)}
              >
                <ClipboardCopy className="h-3.5 w-3.5 mr-1" /> Copiar
              </Button>
            </div>
            <p>4. Salve o arquivo</p>
          </div>
        </section>

        {/* Passo 5 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Passo 5: Executar o Instalador</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Abra seu navegador e acesse seu domínio: https://seudominio.com/installer</p>
            <p>2. Siga as instruções na tela para completar a instalação:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Crie sua conta de administrador com uma senha segura</li>
              <li>Insira os detalhes do seu banco de dados (o banco de dados MySQL que você criou anteriormente)</li>
              <li>Configure suas configurações de hospedagem (use seu nome de domínio)</li>
              <li>Configure as preferências do sistema</li>
            </ul>
            <p>3. Após completar todos os passos, o sistema finalizará a instalação</p>
          </div>
        </section>

        {/* Passo 6 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Passo 6: Pós-Instalação</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Faça login no seu painel de administração usando as credenciais que você criou durante a instalação</p>
            <p>2. Verifique se todos os recursos estão funcionando corretamente</p>
            <p>3. Configure configurações adicionais conforme necessário</p>
            <p>4. Por razões de segurança, é recomendado:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Configurar backups regulares do banco de dados</li>
              <li>Ativar os recursos de segurança da Hostinger, como certificados SSL</li>
              <li>Manter o aplicativo atualizado com as últimas correções de segurança</li>
            </ul>
          </div>
        </section>

        {/* Informações de Suporte */}
        <section className="border-t border-border pt-6 mt-8">
          <h3 className="text-lg font-semibold mb-3">Precisa de Ajuda?</h3>
          <p>
            Se encontrar algum problema durante a instalação, entre em contato com nossa equipe de suporte em suporte@aimatrix.com ou visite nossa documentação online para guias de solução de problemas.
          </p>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={onClose}>Fechar Guia</Button>
      </div>
    </GlassMorphism>
  );
};

export default HostingerGuidePortugues;
