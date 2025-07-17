const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(endpoint, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default API_ENDPOINTS;
