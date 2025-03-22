
/**
 * Application deployment configuration
 * This file contains settings used when deploying to hosting environments
 */

export const deploymentConfig = {
  // Base URL for the application (can be updated during installation)
  baseUrl: window.location.origin,
  
  // API endpoints configuration
  api: {
    // Default timeout for API requests in milliseconds
    timeout: 30000,
    
    // Whether to use HTTPS for API requests
    useHttps: window.location.protocol === 'https:',
  },
  
  // Static assets configuration
  assets: {
    // Path to static assets
    path: '/assets',
  },
  
  // Application version
  version: '1.0.0',
};

// Helper function to get full asset URL
export const getAssetUrl = (path: string): string => {
  return `${deploymentConfig.baseUrl}${deploymentConfig.assets.path}/${path}`;
};

/**
 * Check if the application is running in production mode
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD === true;
};

/**
 * Get environment-specific configuration
 */
export const getEnvironmentConfig = () => {
  return {
    isDevelopment: import.meta.env.DEV === true,
    isProduction: import.meta.env.PROD === true,
    mode: import.meta.env.MODE,
  };
};
