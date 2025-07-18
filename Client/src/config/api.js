// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }
  // If deployed, use the deployed backend URL
  return 'https://smartattendbackend.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

// Debug: Log the API base URL
console.log(`🔗 API Base URL: ${API_BASE_URL}`);
console.log(`🌍 Current Hostname: ${window.location.hostname}`);
console.log(`🚀 Environment: ${import.meta.env.MODE || 'production'}`);

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  VERIFY_TOKEN: `${API_BASE_URL}/api/auth/verify`,
  
  // Student endpoints
  STUDENTS: `${API_BASE_URL}/api/students`,
  REGISTER_STUDENT: `${API_BASE_URL}/api/students/register`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  PROFILE: `${API_BASE_URL}/api/users/profile`,
};

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include',
    ...options,
  };

  try {
    console.log(`🌐 API Call: ${endpoint}`);
    const response = await fetch(endpoint, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP Error: ${response.status} ${response.statusText}`
      }));
      throw new Error(errorData.message || 'API request failed');
    }
    
    const data = await response.json();
    console.log(`✅ API Success: ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`❌ API Error: ${endpoint}`, error);
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    // Handle CORS errors
    if (error.message.includes('CORS')) {
      throw new Error('CORS error. Please contact support.');
    }
    
    throw error;
  }
};

export default API_ENDPOINTS;
