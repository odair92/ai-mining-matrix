
/**
 * Utility functions for deployment
 */

/**
 * Check if the application is hosted on a production server
 */
export const isProductionHost = (): boolean => {
  const hostname = window.location.hostname;
  return ![
    'localhost',
    '127.0.0.1',
    ''
  ].includes(hostname) && !hostname.includes('.');
};

/**
 * Get the current hosting environment
 */
export const getHostingEnvironment = (): 'development' | 'staging' | 'production' => {
  if (import.meta.env.PROD) {
    // Check for common staging domains
    const hostname = window.location.hostname;
    if (hostname.includes('staging') || hostname.includes('test') || hostname.includes('dev')) {
      return 'staging';
    }
    return 'production';
  }
  return 'development';
};

/**
 * Get configuration based on the hosting environment
 */
export const getEnvironmentConfig = () => {
  const environment = getHostingEnvironment();
  
  // Get the hosting configuration from localStorage if available
  const storedHostingConfig = localStorage.getItem('hostingConfig');
  const hostingConfig = storedHostingConfig ? JSON.parse(storedHostingConfig) : null;
  
  return {
    environment,
    baseUrl: hostingConfig?.baseUrl || window.location.origin,
    apiPath: hostingConfig?.apiPath || '/api',
    assetsPath: hostingConfig?.assetsPath || '/assets',
    useHttps: hostingConfig?.useHttps || window.location.protocol === 'https:'
  };
};

/**
 * Generate an absolute URL for an asset
 */
export const getAssetUrl = (assetPath: string): string => {
  const config = getEnvironmentConfig();
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
  const assetsPath = config.assetsPath.startsWith('/') ? config.assetsPath : `/${config.assetsPath}`;
  const normalizedAssetPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  return `${baseUrl}${assetsPath}/${normalizedAssetPath}`;
};

/**
 * Generate an absolute URL for an API endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const config = getEnvironmentConfig();
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;
  const apiPath = config.apiPath.startsWith('/') ? config.apiPath : `/${config.apiPath}`;
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  return `${baseUrl}${apiPath}/${normalizedEndpoint}`;
};
