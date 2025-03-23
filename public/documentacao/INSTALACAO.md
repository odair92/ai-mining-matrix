
# Instruções de Instalação do AI Mining Matrix

## Índice

1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Métodos de Instalação](#métodos-de-instalação)
   - [Método 1: Instalação via Interface Web](#método-1-instalação-via-interface-web)
   - [Método 2: Instalação Automática via Script PHP](#método-2-instalação-automática-via-script-php)
   - [Método 3: Instalação Manual](#método-3-instalação-manual)
3. [Configuração Pós-Instalação](#configuração-pós-instalação)
4. [Solução de Problemas Comuns](#solução-de-problemas-comuns)
5. [Segurança Recomendada](#segurança-recomendada)

## Requisitos do Sistema

Para executar o AI Mining Matrix corretamente, seu servidor deve atender aos seguintes requisitos mínimos:

### Hospedagem Web
- PHP 7.4 ou superior
- MySQL 5.7 ou superior (ou MariaDB 10.3+)
- Extensões PHP: PDO, PDO_MySQL, JSON, OpenSSL, mbstring, cURL, GD
- Servidor Web: Apache ou Nginx
- HTTPS recomendado para ambiente de produção

### Requisitos de Armazenamento
- Espaço em disco: Mínimo de 100MB para a instalação básica
- Banco de dados: Espaço adicional dependendo do número de usuários e transações
- RAM do servidor: Mínimo recomendado de 2GB para desempenho adequado

### Navegadores Suportados (para usuários finais)
- Google Chrome (últimas 2 versões principais)
- Mozilla Firefox (últimas 2 versões principais)
- Safari (últimas 2 versões principais)
- Microsoft Edge (últimas 2 versões principais)

## Métodos de Instalação

### Método 1: Instalação via Interface Web

Esta é a maneira mais simples de instalar o sistema, recomendada para a maioria dos usuários.

1. **Faça upload dos arquivos para o servidor**
   - Baixe o pacote completo do AI Mining Matrix
   - Descompacte o arquivo localmente
   - Faça upload de todos os arquivos para o diretório público do seu servidor (geralmente `public_html`, `www` ou `htdocs`)

2. **Execute o instalador**
   - Abra seu navegador e acesse `https://seudominio.com/installer`
   - Siga as instruções na tela para configurar o sistema:
     - Dados do administrador
     - Configuração do banco de dados
     - Configurações de hospedagem
     - Preferências do sistema

3. **Finalize a instalação**
   - Após concluir todos os passos, o sistema será configurado automaticamente
   - Você será redirecionado para a página inicial do sistema

### Método 2: Instalação Automática via Script PHP

Use este método se preferir uma instalação mais rápida ou se estiver tendo problemas com o instalador web.

1. **Faça upload dos arquivos para o servidor**
   - Carregue todos os arquivos para o diretório público do seu servidor

2. **Execute o script de instalação**
   - Acesse `https://seudominio.com/install.php` em seu navegador
   - Preencha o formulário com:
     - Dados de conexão do banco de dados
     - Informações da conta do administrador
     - Nome do site

3. **Finalize a instalação**
   - Após a conclusão, exclua o arquivo `install.php` do servidor por segurança
   - Acesse o sistema em `https://seudominio.com`

### Método 3: Instalação Manual

Este método é recomendado para usuários avançados que desejam controle total sobre o processo de instalação.

1. **Preparação do banco de dados**
   - Crie um banco de dados MySQL vazio
   - Importe o arquivo SQL localizado em `database/aimatrix.sql`
   - Crie um usuário com privilégios completos para este banco de dados

2. **Configuração dos arquivos**
   - Renomeie o arquivo `config.sample.php` para `config.php`
   - Edite `config.php` e insira as informações do banco de dados e outras configurações
   - Certifique-se de que o arquivo `.htaccess` está configurado corretamente para seu servidor

3. **Criação do usuário administrador**
   - Insira manualmente um registro na tabela `users` com o papel (role) definido como 'admin'
   - Use uma função de hash segura para a senha (como `password_hash()` do PHP)

4. **Configuração do servidor Web**
   - Configure seu servidor Web para apontar para o diretório onde os arquivos foram instalados
   - Para Apache: Certifique-se de que o mod_rewrite está habilitado
   - Para Nginx: Configure regras de rewrite adequadas para aplicativos SPA

## Configuração Pós-Instalação

Após a conclusão da instalação, recomendamos as seguintes etapas para otimizar e proteger seu sistema:

1. **Segurança**
   - Ative HTTPS (obtenha um certificado SSL)
   - Remova arquivos de instalação (`install.php`, `installer/`)
   - Defina permissões corretas para arquivos e diretórios

2. **Otimização**
   - Configure o cache do navegador para recursos estáticos
   - Habilite a compressão GZIP/Brotli no servidor

3. **Backup**
   - Configure rotinas regulares de backup do banco de dados
   - Estabeleça um plano para backups dos arquivos do sistema

4. **Gateways de Pagamento**
   - Configure os gateways de pagamento necessários no painel de administração
   - Teste processamentos de pagamento antes de disponibilizar para usuários

## Solução de Problemas Comuns

### Página em branco após instalação
- Verifique os logs de erro do PHP
- Certifique-se de que o mod_rewrite está habilitado (Apache)
- Verifique se o arquivo .htaccess está presente e correto

### Erros de conexão com o banco de dados
- Verifique se as credenciais estão corretas em `config.php`
- Confirme se o usuário tem permissões para o banco de dados
- Verifique se o banco de dados está acessível do servidor

### Problemas com rotas (404 ao atualizar página)
- Verifique a configuração do .htaccess para Apache
- Para Nginx, configure regras de rewrite para SPA
- Exemplo de regra para Nginx:
  ```
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

### Problemas com permissões
- Diretórios que precisam ser graváveis:
  - `/uploads` (permission 755)
  - `/logs` (permission 755)
  - `/cache` (permission 755)

## Segurança Recomendada

1. **Servidor**
   - Mantenha o PHP e o servidor Web atualizados
   - Use um firewall adequado
   - Configure o PHP com configurações seguras
   - Desative funções perigosas do PHP

2. **Aplicação**
   - Altere a senha de administrador regularmente
   - Implemente autenticação de dois fatores
   - Mantenha o sistema atualizado com as últimas correções de segurança

3. **Banco de Dados**
   - Use senhas fortes para o banco de dados
   - Limite o acesso ao banco de dados apenas ao servidor da aplicação
   - Faça backups regulares

---

Para assistência adicional, entre em contato com nossa equipe de suporte em suporte@aimatrix.com
