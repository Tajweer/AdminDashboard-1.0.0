const config = {
  production: false, // Set to true for production, false for development
  
  api: {
    baseUrl: {
      local: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
      production: "https://api.tajweer.com" // Update this with your actual production URL
    }
  },
  
  getApiBaseUrl() {
    return this.production ? this.api.baseUrl.production : this.api.baseUrl.local;
  }
};

export default config;
