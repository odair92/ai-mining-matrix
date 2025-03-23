
# Guia de Configuração da PayKassa no AI Mining Matrix

## Índice

1. [Introdução](#introdução)
2. [Criando Conta na PayKassa](#criando-conta-na-paykassa)
3. [Configurando a API PayKassa](#configurando-a-api-paykassa)
4. [Integrando com o AI Mining Matrix](#integrando-com-o-ai-mining-matrix)
5. [Testando a Integração](#testando-a-integração)
6. [Solução de Problemas](#solução-de-problemas)

## Introdução

Este documento detalha como configurar o gateway de pagamento PayKassa com o sistema AI Mining Matrix para processamento de depósitos e saques em criptomoedas.

A PayKassa é um processador de pagamentos que suporta diversas criptomoedas, incluindo Bitcoin, Ethereum, Litecoin, e muitas outras, permitindo que sua plataforma de mineração aceite uma ampla variedade de métodos de pagamento.

## Criando Conta na PayKassa

### Passo 1: Registro na PayKassa

1. Acesse o site oficial da PayKassa em [https://paykassa.pro](https://paykassa.pro)
2. Clique no botão "Registrar" ou "Criar Conta"
3. Preencha o formulário de registro com suas informações:
   - Email
   - Senha
   - Confirmar Senha
   - Número de telefone
   - Aceitar os termos de serviço
4. Complete o processo de verificação de email

![Registro PayKassa](../assets/docs/paykassa-registro.jpg)

### Passo 2: Verificação de Identidade

1. Após fazer login, navegue até "Configurações da Conta" ou "Verificação"
2. Complete o processo KYC (Know Your Customer) enviando:
   - Documento de identidade (passaporte ou identidade nacional)
   - Comprovante de endereço (conta de serviços públicos com menos de 3 meses)
   - Selfie com o documento de identidade
3. Aguarde a aprovação da verificação (geralmente 1-3 dias úteis)

![Verificação KYC](../assets/docs/paykassa-kyc.jpg)

## Configurando a API PayKassa

### Passo 1: Criando um Projeto

1. No painel da PayKassa, navegue até "Integração" ou "API"
2. Clique em "Criar novo projeto" ou "Adicionar site"
3. Preencha as informações do seu site:
   - Nome do projeto (ex: "AI Mining Matrix")
   - URL do site (ex: "https://seudominio.com")
   - Descrição do projeto (opcional)
   - Escolha as moedas que deseja aceitar

![Criar Projeto](../assets/docs/paykassa-projeto.jpg)

### Passo 2: Obtendo Credenciais da API

1. Após criar o projeto, você receberá:
   - ID do Comerciante (Merchant ID)
   - Chave API (API Key)
   - Chave secreta (Secret Key)
2. Guarde essas informações com segurança, pois serão necessárias para a integração

![Credenciais API](../assets/docs/paykassa-credenciais.jpg)

### Passo 3: Configurando URLs de Callback

1. No painel do projeto, procure a seção "IPN Settings" ou "Callbacks"
2. Configure os seguintes URLs:
   - URL de Sucesso: `https://seudominio.com/payment/success`
   - URL de Falha: `https://seudominio.com/payment/failure`
   - URL de Callback (IPN): `https://seudominio.com/api/payment/paykassa/callback`
3. Salve as configurações

![URLs de Callback](../assets/docs/paykassa-callbacks.jpg)

## Integrando com o AI Mining Matrix

### Passo 1: Acessando as Configurações de Pagamento

1. Faça login no painel administrativo do AI Mining Matrix
2. Navegue até "Configurações" > "Gateways de Pagamento"
3. Localize a opção "PayKassa" na lista de gateways disponíveis

![Menu de Gateways](../assets/docs/aimatrix-gateways.jpg)

### Passo 2: Configurando o Gateway PayKassa

1. Clique em "Configurar" ou "Editar" ao lado da opção PayKassa
2. Preencha os campos com as credenciais obtidas:
   - Merchant ID (ID do Comerciante)
   - API Key (Chave API)
   - Secret Key (Chave Secreta)
3. Configure as moedas que deseja aceitar marcando as opções correspondentes
4. Defina taxas adicionais se necessário
5. Defina valores mínimos de depósito para cada moeda
6. Clique em "Salvar Configurações"

![Configuração PayKassa](../assets/docs/aimatrix-paykassa-config.jpg)

### Passo 3: Ativando o Gateway

1. Na lista de gateways, localize a PayKassa
2. Altere o status para "Ativo"
3. Confirme a ativação quando solicitado

![Ativação do Gateway](../assets/docs/aimatrix-ativar-gateway.jpg)

## Testando a Integração

### Passo 1: Modo de Teste

1. No painel do AI Mining Matrix, certifique-se de que o modo de teste está ativado:
   - Vá para "Configurações" > "Sistema" 
   - Ative a opção "Modo de Teste para Pagamentos"
2. No painel da PayKassa, verifique se o projeto está em modo de teste:
   - Acesse seu projeto
   - Certifique-se de que a opção "Sandbox" ou "Modo de Teste" está ativada

![Modo de Teste](../assets/docs/aimatrix-modo-teste.jpg)

### Passo 2: Realizando um Depósito de Teste

1. Efetue logout da conta de administrador
2. Faça login com uma conta de usuário comum
3. Navegue até "Depósito" ou "Adicionar Fundos"
4. Selecione PayKassa como método de pagamento
5. Selecione uma criptomoeda (ex: Bitcoin)
6. Insira um valor para depósito
7. Clique em "Depositar" ou "Prosseguir"
8. Você será redirecionado para a página de pagamento da PayKassa
9. No ambiente de teste, você verá instruções para simular um pagamento
10. Complete o pagamento de teste

![Depósito de Teste](../assets/docs/aimatrix-teste-deposito.jpg)

### Passo 3: Verificando o Resultado

1. Após completar o pagamento de teste, você deverá ser redirecionado de volta ao AI Mining Matrix
2. Verifique a seção "Histórico de Transações" para confirmar se o depósito foi registrado corretamente
3. Verifique também o painel administrativo em "Transações" > "Depósitos" para confirmar o registro
4. Se tudo estiver correto, você verá a transação listada com status "Concluído" ou "Pendente"

## Solução de Problemas

### Problema: Pagamento realizado mas não registrado no sistema

**Possíveis causas e soluções:**
1. **URL de Callback incorreto:**
   - Verifique se o URL de callback está corretamente configurado na PayKassa
   - Formato correto: `https://seudominio.com/api/payment/paykassa/callback`

2. **Erros nos logs:**
   - Verifique os logs do sistema em "Administração" > "Logs do Sistema"
   - Procure por erros relacionados a "PayKassa" ou "IPN"

3. **IP Bloqueado:**
   - Certifique-se de que o IP da PayKassa não está sendo bloqueado por firewall
   - IPs da PayKassa devem ser adicionados à lista de permissões

### Problema: Erro de autenticação da API

**Possíveis causas e soluções:**
1. **Credenciais incorretas:**
   - Verifique se o Merchant ID, API Key e Secret Key foram inseridos corretamente
   - Não inclua espaços antes ou depois das chaves

2. **Projeto em status inativo:**
   - Verifique se o projeto está ativo no painel da PayKassa
   - Certifique-se de que sua conta PayKassa está totalmente verificada

### Problema: Moedas não aparecem para seleção

**Possíveis causas e soluções:**
1. **Moedas não habilitadas no projeto:**
   - Verifique se as moedas desejadas estão habilitadas no projeto da PayKassa
   - Acesse seu projeto na PayKassa e confirme as moedas ativadas

2. **Configuração do sistema:**
   - Verifique se as moedas estão habilitadas nas configurações do AI Mining Matrix
   - Acesse "Administração" > "Criptomoedas" e verifique os status

### Problema: Taxas incorretas sendo aplicadas

**Possíveis causas e soluções:**
1. **Configuração de taxas:**
   - Verifique a configuração de taxas no gateway PayKassa
   - As taxas podem ser definidas como percentual ou valor fixo

2. **Sobreposição de taxas:**
   - Verifique se não há taxas duplicadas sendo aplicadas no sistema
   - Taxas podem ser definidas a nível de sistema e a nível de gateway

---

Para assistência adicional com a configuração da PayKassa, entre em contato com nossa equipe de suporte em suporte@aimatrix.com ou com o suporte da PayKassa em support@paykassa.pro.
