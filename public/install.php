
<?php
/**
 * AI Mining Matrix - Automatic Installation Script
 * Version 1.0.0
 * 
 * Este script permite a instalação automática do sistema AI Mining Matrix
 * em servidores que suportam PHP.
 */

// Verificar compatibilidade com PHP
if (version_compare(PHP_VERSION, '7.4.0', '<')) {
    die('AI Mining Matrix requer PHP 7.4 ou superior. Sua versão atual é ' . PHP_VERSION);
}

// Configurações iniciais
$installPath = dirname(__FILE__);
$configFile = $installPath . '/config.php';
$dbFile = $installPath . '/database/aimatrix.sql';

// Funções auxiliares
function showMessage($message, $type = 'info') {
    $color = 'blue';
    if ($type === 'error') $color = 'red';
    if ($type === 'success') $color = 'green';
    echo "<div style='color: $color; padding: 10px; margin: 10px 0; border: 1px solid $color;'>$message</div>";
}

function createConfig($dbHost, $dbName, $dbUser, $dbPass, $adminEmail, $siteName) {
    global $configFile;
    
    $content = "<?php
/**
 * AI Mining Matrix - Configuração do Sistema
 * Este arquivo é gerado automaticamente durante a instalação
 */

// Configurações do Banco de Dados
define('DB_HOST', '{$dbHost}');
define('DB_NAME', '{$dbName}');
define('DB_USER', '{$dbUser}');
define('DB_PASS', '{$dbPass}');

// Configurações do Site
define('SITE_NAME', '{$siteName}');
define('ADMIN_EMAIL', '{$adminEmail}');
define('INSTALLED_DATE', date('Y-m-d H:i:s'));
define('DEBUG_MODE', false);

// Configurações de Segurança
define('AUTH_KEY', '" . md5(uniqid(rand(), true)) . "');
define('SECURE_AUTH_KEY', '" . md5(uniqid(rand(), true)) . "');

// Não modifique este arquivo manualmente
";
    
    return file_put_contents($configFile, $content);
}

function importDatabase($dbHost, $dbName, $dbUser, $dbPass) {
    global $dbFile;
    
    try {
        // Conectar ao banco de dados
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Ler o arquivo SQL
        if (!file_exists($dbFile)) {
            return [false, "Arquivo SQL não encontrado em: $dbFile"];
        }
        
        $sql = file_get_contents($dbFile);
        if (!$sql) {
            return [false, "Não foi possível ler o arquivo SQL"];
        }
        
        // Dividir e executar comandos SQL
        $queries = explode(';', $sql);
        foreach ($queries as $query) {
            $query = trim($query);
            if (!empty($query)) {
                $pdo->exec($query);
            }
        }
        
        return [true, "Banco de dados importado com sucesso"];
    } catch (PDOException $e) {
        return [false, "Erro ao importar banco de dados: " . $e->getMessage()];
    }
}

function createAdminUser($dbHost, $dbName, $dbUser, $dbPass, $email, $password) {
    try {
        // Conectar ao banco de dados
        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Verificar se o usuário já existe
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            return [false, "E-mail já registrado no sistema"];
        }
        
        // Criar hash da senha
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        
        // Inserir usuário administrador
        $stmt = $pdo->prepare("INSERT INTO users (email, password, name, role, status) VALUES (?, ?, 'Administrator', 'admin', 'active')");
        $stmt->execute([$email, $passwordHash]);
        
        return [true, "Usuário administrador criado com sucesso"];
    } catch (PDOException $e) {
        return [false, "Erro ao criar usuário administrador: " . $e->getMessage()];
    }
}

// Verificar se a instalação já foi concluída
if (file_exists($configFile)) {
    showMessage("O sistema já está instalado. Remova o arquivo 'config.php' para reinstalar.", 'error');
    exit;
}

$error = false;
$success = false;

// Processamento do formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar dados
    $dbHost = trim($_POST['db_host'] ?? '');
    $dbName = trim($_POST['db_name'] ?? '');
    $dbUser = trim($_POST['db_user'] ?? '');
    $dbPass = $_POST['db_pass'] ?? '';
    $adminEmail = trim($_POST['admin_email'] ?? '');
    $adminPass = $_POST['admin_pass'] ?? '';
    $confirmPass = $_POST['confirm_pass'] ?? '';
    $siteName = trim($_POST['site_name'] ?? 'AI Mining Matrix');
    
    if (empty($dbHost) || empty($dbName) || empty($dbUser) || empty($adminEmail) || empty($adminPass)) {
        showMessage("Preencha todos os campos obrigatórios", 'error');
        $error = true;
    } else if ($adminPass !== $confirmPass) {
        showMessage("As senhas não coincidem", 'error');
        $error = true;
    } else if (!filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
        showMessage("E-mail inválido", 'error');
        $error = true;
    } else {
        // Verificar conexão com o banco de dados
        try {
            $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
            
            // Criar arquivo de configuração
            if (!createConfig($dbHost, $dbName, $dbUser, $dbPass, $adminEmail, $siteName)) {
                showMessage("Não foi possível criar o arquivo de configuração. Verifique as permissões de escrita.", 'error');
                $error = true;
            } else {
                // Importar banco de dados
                list($dbSuccess, $dbMessage) = importDatabase($dbHost, $dbName, $dbUser, $dbPass);
                if (!$dbSuccess) {
                    showMessage($dbMessage, 'error');
                    $error = true;
                    
                    // Remover arquivo de configuração se a importação falhar
                    if (file_exists($configFile)) {
                        unlink($configFile);
                    }
                } else {
                    // Criar usuário administrador
                    list($userSuccess, $userMessage) = createAdminUser($dbHost, $dbName, $dbUser, $dbPass, $adminEmail, $adminPass);
                    if (!$userSuccess) {
                        showMessage($userMessage, 'error');
                        $error = true;
                    } else {
                        $success = true;
                        showMessage("Instalação concluída com sucesso!", 'success');
                    }
                }
            }
        } catch (PDOException $e) {
            showMessage("Erro ao conectar ao banco de dados: " . $e->getMessage(), 'error');
            $error = true;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalação - AI Mining Matrix</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            background: #3498db;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
        }
        .btn:hover {
            background: #2980b9;
        }
        .success-message {
            text-align: center;
            padding: 20px;
        }
        .step {
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        .step h2 {
            color: #2c3e50;
            margin-bottom: 15px;
        }
        .note {
            background-color: #f8f9fa;
            padding: 10px;
            border-left: 4px solid #3498db;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Instalação do AI Mining Matrix</h1>
        
        <?php if ($success): ?>
            <div class="success-message">
                <h2>Instalação Concluída!</h2>
                <p>Seu sistema AI Mining Matrix foi instalado com sucesso.</p>
                <p>Você pode acessar o painel administrativo usando o e-mail e senha que você configurou.</p>
                <p>Por segurança, exclua este arquivo (install.php) do seu servidor.</p>
                <p><a href="index.html" class="btn">Ir para o Sistema</a></p>
            </div>
        <?php else: ?>
            <div class="note">
                <p><strong>Bem-vindo ao instalador do AI Mining Matrix</strong></p>
                <p>Este assistente irá guiá-lo através do processo de instalação. Certifique-se de ter as seguintes informações:</p>
                <ul>
                    <li>Dados de acesso ao banco de dados MySQL</li>
                    <li>E-mail e senha para a conta de administrador</li>
                </ul>
            </div>
            
            <form method="post" action="">
                <div class="step">
                    <h2>1. Configuração do Banco de Dados</h2>
                    <div class="form-group">
                        <label for="db_host">Host do Banco de Dados*:</label>
                        <input type="text" id="db_host" name="db_host" value="<?php echo $_POST['db_host'] ?? 'localhost'; ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="db_name">Nome do Banco de Dados*:</label>
                        <input type="text" id="db_name" name="db_name" value="<?php echo $_POST['db_name'] ?? 'aimatrix'; ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="db_user">Usuário do Banco de Dados*:</label>
                        <input type="text" id="db_user" name="db_user" value="<?php echo $_POST['db_user'] ?? ''; ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="db_pass">Senha do Banco de Dados:</label>
                        <input type="password" id="db_pass" name="db_pass" value="<?php echo $_POST['db_pass'] ?? ''; ?>">
                    </div>
                </div>
                
                <div class="step">
                    <h2>2. Configuração do Administrador</h2>
                    <div class="form-group">
                        <label for="admin_email">E-mail do Administrador*:</label>
                        <input type="email" id="admin_email" name="admin_email" value="<?php echo $_POST['admin_email'] ?? ''; ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="admin_pass">Senha do Administrador*:</label>
                        <input type="password" id="admin_pass" name="admin_pass" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm_pass">Confirmar Senha*:</label>
                        <input type="password" id="confirm_pass" name="confirm_pass" required>
                    </div>
                </div>
                
                <div class="step">
                    <h2>3. Configuração do Site</h2>
                    <div class="form-group">
                        <label for="site_name">Nome do Site:</label>
                        <input type="text" id="site_name" name="site_name" value="<?php echo $_POST['site_name'] ?? 'AI Mining Matrix'; ?>">
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button type="submit" class="btn">Instalar Sistema</button>
                </div>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
