const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://hardware-sets-ark-backend.onrender.com'
    : 'http://localhost:5000'
};

export default config;