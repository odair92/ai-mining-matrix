
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCopy, FileDown, FileCode, Globe, Server, Database, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import GlassMorphism from '@/components/ui/GlassMorphism';

interface HostingerGuideProps {
  onClose: () => void;
}

const HostingerGuide: React.FC<HostingerGuideProps> = ({ onClose }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard"
    });
  };

  return (
    <GlassMorphism className="max-w-4xl mx-auto p-6 overflow-y-auto max-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hostinger Installation Guide</h2>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Overview</h3>
          <p className="mb-2">
            This guide will help you install AI Mining Matrix on Hostinger web hosting. Follow these steps carefully to ensure a successful installation.
          </p>
        </section>

        {/* Step 1 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Step 1: Prepare Your Hostinger Account</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Log in to your Hostinger account and access your hosting control panel (hPanel)</p>
            <p>2. Make sure you have a domain name connected to your hosting account</p>
            <p>3. Note down the following information that you'll need during installation:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your domain name (e.g., yourdomain.com)</li>
              <li>FTP/File Manager login details</li>
              <li>MySQL database name, username, and password</li>
            </ul>
          </div>
        </section>

        {/* Step 2 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Step 2: Create a MySQL Database</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. In hPanel, go to "Databases" → "MySQL Databases"</p>
            <p>2. Create a new database by entering a name (e.g., "aimatrix")</p>
            <p>3. Create a new database user and assign a strong password</p>
            <p>4. Add the user to the database with "All Privileges"</p>
            <p>5. Save the database name, username and password for the installation process</p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <FileDown className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Step 3: Upload Files to Hostinger</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Download the AI Mining Matrix package from the official website</p>
            <p>2. Extract the package on your local computer</p>
            <p>3. In hPanel, go to "Files" → "File Manager"</p>
            <p>4. Navigate to the public_html directory (or the directory where you want to install)</p>
            <p>5. Upload all the files from the extracted package to this directory</p>
            <p className="text-sm text-muted-foreground mt-2">
              Alternatively, you can use FTP software like FileZilla to upload the files:
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm mt-1">
              <p>Host: ftp.yourdomain.com</p>
              <p>Username: Your Hostinger username</p>
              <p>Password: Your Hostinger password</p>
              <p>Port: 21</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => copyToClipboard("Host: ftp.yourdomain.com\nUsername: Your Hostinger username\nPassword: Your Hostinger password\nPort: 21")}
              >
                <ClipboardCopy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <FileCode className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Step 4: Configure .htaccess</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. In the File Manager, check if the .htaccess file exists in your root directory</p>
            <p>2. If it doesn't exist, create a new file named .htaccess</p>
            <p>3. Copy and paste the following code into the .htaccess file:</p>
            <div className="bg-muted/50 p-3 rounded-md text-sm relative mt-1">
              <pre className="whitespace-pre-wrap">
{`# Apache configuration file for SPA
# This enables proper routing for single page applications

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # If the request is not for a file or directory, redirect to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Enable CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
  Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
</IfModule>

# Configure cache control
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # Web fonts
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`}
              </pre>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => copyToClipboard(`# Apache configuration file for SPA
# This enables proper routing for single page applications

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # If the request is not for a file or directory, redirect to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Enable CORS
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
  Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
</IfModule>

# Configure cache control
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # Web fonts
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`)}
              >
                <ClipboardCopy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
            <p>4. Save the file</p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Step 5: Run the Installer</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Open your web browser and navigate to your domain: https://yourdomain.com/installer</p>
            <p>2. Follow the on-screen instructions to complete the installation:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Create your admin account with a secure password</li>
              <li>Enter your database details (the MySQL database you created earlier)</li>
              <li>Configure your hosting settings (use your domain name)</li>
              <li>Set up system preferences</li>
            </ul>
            <p>3. After completing all steps, the system will finalize the installation</p>
          </div>
        </section>

        {/* Step 6 */}
        <section className="border-l-2 border-primary/50 pl-4">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Step 6: Post-Installation</h3>
          </div>
          <div className="mt-3 space-y-2">
            <p>1. Log in to your admin panel using the credentials you created during installation</p>
            <p>2. Verify that all features are working correctly</p>
            <p>3. Configure additional settings as needed</p>
            <p>4. For security reasons, it's recommended to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Set up regular database backups</li>
              <li>Enable Hostinger's security features like SSL certificates</li>
              <li>Keep the application updated with the latest security patches</li>
            </ul>
          </div>
        </section>

        {/* Support Information */}
        <section className="border-t border-border pt-6 mt-8">
          <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
          <p>
            If you encounter any issues during installation, please contact our support team at support@aimatrix.com or visit our online documentation for troubleshooting guides.
          </p>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={onClose}>Close Guide</Button>
      </div>
    </GlassMorphism>
  );
};

export default HostingerGuide;
