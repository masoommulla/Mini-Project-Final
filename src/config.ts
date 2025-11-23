// Configuration for frontend application
// All environment variables must be prefixed with VITE_ for Vite to expose them

// Safe environment variable access with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  try {
    return import.meta?.env?.[key] || fallback;
  } catch (error) {
    console.warn(`Failed to access environment variable ${key}, using fallback`);
    return fallback;
  }
};

export const config = {
  // Backend API URL
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:5000/api'),
  
  // Botpress Configuration
  botpress: {
    webchatUrl: getEnvVar('VITE_BOTPRESS_WEBCHAT_URL', 'https://cdn.botpress.cloud/webchat/v3.3/shareable.html'),
    configUrl: getEnvVar('VITE_BOTPRESS_CONFIG_URL', 'https://files.bpcontent.cloud/2025/11/09/17/20251109173139-QPZXD221.json'),
  },
} as const;

// For backwards compatibility
export const API_URL = config.apiUrl;