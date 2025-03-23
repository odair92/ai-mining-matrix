
# Guia de Solução de Problemas de Hospedagem - AI Mining Matrix

Este guia aborda problemas comuns encontrados ao hospedar o AI Mining Matrix em diferentes ambientes de hospedagem e fornece soluções específicas para cada situação.

## Índice

1. [Problemas Gerais](#problemas-gerais)
2. [Hospedagem Compartilhada](#hospedagem-compartilhada)
   - [Hostinger](#hostinger)
   - [cPanel (GoDaddy, HostGator, etc.)](#cpanel-godaddy-hostgator-etc)
   - [Locaweb](#locaweb)
3. [VPS e Servidores Dedicados](#vps-e-servidores-dedicados)
   - [Digital Ocean](#digital-ocean)
   - [AWS](#aws)
   - [Google Cloud](#google-cloud)
4. [Problemas com HTTPS e SSL](#problemas-com-https-e-ssl)
5. [Problemas de Banco de Dados](#problemas-de-banco-de-dados)
6. [Problemas de Permissões de Arquivos](#problemas-de-permissões-de-arquivos)

## Problemas Gerais

### Página em Branco após Instalação

**Sintomas:**
- Após a instalação, o site exibe uma página em branco ou completamente vazia.

**Soluções:**
1. **Verifique os Logs de Erro:**
   - Acesse os logs de erro do PHP no seu painel de hospedagem
   - Procure por mensagens de erro específicas

2. **Verifique as Configurações do PHP:**
   - Certifique-se de que sua hospedagem suporta PHP 7.4 ou superior
   - Verifique se as extensões necessárias estão habilitadas (PDO, JSON, etc.)

3. **Limpe o Cache do Navegador:**
   - Use Ctrl+F5 para recarregar a página sem cache
   - Tente outro navegador para descartar problemas locais

### Erro 404 ao Navegar entre Páginas

**Sintomas:**
- O site carrega a página inicial, mas ao navegar para outras páginas ou atualizar uma página interna, aparece erro 404.

**Soluções:**
1. **Verifique o arquivo .htaccess:**
   - Confirme se o arquivo .htaccess está presente na raiz do site
   - Verifique se o conteúdo está correto conforme a documentação

2. **Configure o Redirecionamento SPA:**
   - Para Apache: Certifique-se de que o mod_rewrite está habilitado
   - Para Nginx: Configure o redirecionamento para SPA no arquivo de configuração do servidor

## Hospedagem Compartilhada

### Hostinger

#### Problema: Erro 500 durante instalação

**Soluções:**
1. **Ajuste Limites de PHP:**
   - Acesse o hPanel > PHP Configuration
   - Aumente os valores de:
     - `max_execution_time` para 300
     - `memory_limit` para 256M
     - `upload_max_filesize` para 64M
     - `post_max_size` para 64M

2. **Verifique o arquivo .htaccess:**
   - Se estiver recebendo erro 500, pode haver um conflito no .htaccess
   - Renomeie o .htaccess para .htaccess_bak
   - Crie um novo .htaccess apenas com as regras básicas e adicione mais regras progressivamente

#### Problema: Requisições AJAX não funcionam

**Soluções:**
1. **Configuração CORS:**
   - Adicione ao arquivo .htaccess:
   ```
   <IfModule mod_headers.c>
     Header set Access-Control-Allow-Origin "*"
     Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
     Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   </IfModule>
   ```

2. **Modo de Compatibilidade PHP:**
   - No hPanel, configure o PHP para o modo de "Compatibilidade com scripts avançados"

### cPanel (GoDaddy, HostGator, etc.)

#### Problema: Erro 500 ou site não carrega

**Soluções:**
1. **Verifique as versões do PHP:**
   - Em cPanel, vá para "Select PHP Version"
   - Selecione PHP 7.4 ou superior
   - Habilite as extensões: PDO, PDO_MySQL, JSON, OpenSSL, mbstring, cURL, GD

2. **Solução de problemas com .htaccess:**
   - Acesse o "Error Log" no cPanel para ver mensagens de erro específicas
   - Se houver erros relacionados a diretivas .htaccess, modifique o arquivo conforme necessário

#### Problema: Permissões de arquivo

**Soluções:**
1. **Ajuste permissões via File Manager:**
   - Diretórios: 755 (`drwxr-xr-x`)
   - Arquivos: 644 (`-rw-r--r--`)
   - Arquivos que precisam de escrita: 664 (`-rw-rw-r--`)
   - No cPanel, use "File Manager" > clique com botão direito > "Change Permissions"

### Locaweb

#### Problema: Regras de redirecionamento não funcionam

**Soluções:**
1. **Configuração personalizada:**
   - A Locaweb pode requerer configurações específicas para o .htaccess
   - Use o seguinte modelo adaptado:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     
     # Removendo index.php das URLs
     RewriteCond %{THE_REQUEST} ^GET\ /.*index\.php [NC]
     RewriteRule (.*)index\.php/(.*) /$1$2 [R=301,L]
     
     # Redirecionamento para index.html
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^(.*)$ /index.html [L]
   </IfModule>
   ```

2. **Contate o suporte da Locaweb:**
   - Em alguns planos, pode ser necessário solicitar ao suporte a habilitação de mod_rewrite

## VPS e Servidores Dedicados

### Digital Ocean

#### Problema: Configuração do servidor Nginx

**Solução:**
1. **Configure o arquivo do site:**
   - Edite o arquivo de configuração em `/etc/nginx/sites-available/seu-site`
   - Adicione a seguinte configuração:
   ```
   server {
       listen 80;
       server_name seudominio.com www.seudominio.com;
       root /var/www/html/seu-site;  # Ajuste para o caminho correto
       
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Cache para arquivos estáticos
       location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
           expires max;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```

2. **Aplique a configuração:**
   ```
   sudo ln -s /etc/nginx/sites-available/seu-site /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### AWS

#### Problema: Configuração de balanceador de carga e CORS

**Solução:**
1. **Configuração do balanceador de carga:**
   - Se estiver usando um Application Load Balancer (ALB):
     - Configure o encaminhamento para a porta 80/443
     - Configure o health check para a rota `/health` ou a rota principal
     - Adicione um ouvinte HTTPS com seu certificado SSL

2. **Configuração CORS para S3 (se estiver usando para assets):**
   - Na configuração do bucket S3, adicione a seguinte política CORS:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedOrigins": ["https://seudominio.com"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

### Google Cloud

#### Problema: Configuração do App Engine ou Compute Engine

**Solução para App Engine:**
1. **Crie um arquivo app.yaml:**
   ```yaml
   runtime: nodejs14
   
   handlers:
   - url: /assets
     static_dir: dist/assets
     secure: always
   
   - url: /(.*\.(json|ico|js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))
     static_files: dist/\1
     upload: dist/.*\.(json|ico|js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)
     secure: always
   
   - url: /.*
     static_files: dist/index.html
     upload: dist/index.html
     secure: always
   ```

**Solução para Compute Engine:**
1. **Configure o Nginx:**
   - Siga as instruções do Digital Ocean acima, ajustando para seu ambiente

## Problemas com HTTPS e SSL

### Certificado SSL não funciona corretamente

**Sintomas:**
- O site mostra "Não seguro" ou erros de certificado
- Recursos mistos (HTTP e HTTPS) causando erros

**Soluções:**
1. **Verificação de configuração SSL:**
   - Confirme se o certificado está corretamente instalado
   - Verifique se o certificado não expirou

2. **Forçar HTTPS:**
   - Adicione ao .htaccess (Apache):
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   </IfModule>
   ```
   - Para Nginx:
   ```
   server {
     listen 80;
     server_name seudominio.com www.seudominio.com;
     return 301 https://$host$request_uri;
   }
   ```

3. **Correção de conteúdo misto:**
   - No código do AI Mining Matrix, certifique-se de que todas as URLs usam HTTPS ou caminhos relativos
   - Verifique se a configuração `baseUrl` no sistema usa HTTPS

## Problemas de Banco de Dados

### Erro de conexão com o banco de dados

**Sintomas:**
- Mensagens de erro indicando falha na conexão com o banco de dados
- Sistema não consegue salvar ou recuperar dados

**Soluções:**
1. **Verifique as credenciais:**
   - Confirme se usuário, senha, nome do banco e host estão corretos
   - Em alguns casos, o host pode precisar ser alterado de 'localhost' para '127.0.0.1'

2. **Verifique privilégios do usuário:**
   - O usuário do banco de dados deve ter privilégios para SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX

3. **Verifique a conexão remota:**
   - Se o banco de dados está em um servidor diferente, certifique-se de que:
     - A conexão remota está habilitada no servidor MySQL
     - O firewall permite conexões na porta do MySQL (geralmente 3306)

### Erro de importação do banco de dados

**Sintomas:**
- Erros durante a importação do arquivo SQL inicial
- Mensagens sobre tabelas ou colunas não encontradas

**Soluções:**
1. **Verifique a versão do MySQL:**
   - Certifique-se de que o servidor MySQL é compatível (5.7+ ou MariaDB 10.3+)
   - Alguns hosts podem ter restrições em certas consultas SQL

2. **Importe manualmente:**
   - Use ferramentas como phpMyAdmin para importar o arquivo SQL
   - Divida o arquivo SQL em partes menores se for muito grande

## Problemas de Permissões de Arquivos

### Erro de permissão negada

**Sintomas:**
- Mensagens de erro sobre permissões de arquivos
- Recursos não carregando ou operações falhando

**Soluções:**
1. **Configuração correta de permissões:**
   - Diretórios que precisam ser graváveis:
     - `/uploads`: 755 ou 775
     - `/logs`: 755 ou 775
     - `/cache`: 755 ou 775
   - Arquivos específicos:
     - `config.php`: 644 ou 664 (após instalação)

2. **Problemas com proprietário de arquivos:**
   - Para servidores dedicados ou VPS, certifique-se de que o usuário do servidor web (www-data, apache, nginx) tem acesso aos arquivos
   - Comando para corrigir:
   ```
   chown -R www-data:www-data /caminho/para/sua/aplicacao
   ```

---

Se você encontrar outros problemas não listados neste guia, entre em contato com nossa equipe de suporte em suporte@aimatrix.com, fornecendo:
- Detalhes do seu ambiente de hospedagem
- Logs de erro específicos
- Etapas de reprodução do problema
