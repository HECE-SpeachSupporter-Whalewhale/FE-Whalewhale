import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 인증 관련
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', null, { params: credentials });
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw error;
  }
};
export const register = (userData) => api.post('/api/users', userData);
export const sendVerificationEmail = (email) => api.post('/email/send', null, { params: { username: email } });
export const verifyEmail = (email, code) => api.post('/email/verify', { email, code });
export const completeProfile = (userData) => api.post('/complete-profile', null, { params: userData });
export const sendVerificationCode = (email) => api.post('/password/forgot', null, { params: { email } });
export const resetPassword = (data) => api.post('/password/reset', data);

// 프레젠테이션 관련
export const getPresentations = () => api.get('/search');
export const addPresentation = (presentationData) => api.post('/presentations/add', presentationData);
export const deletePresentation = (id) => api.delete(`/presentations/delete/${id}`);
export const toggleBookmark = (id, isBookmarked) => api.post(`/bookmarks/toggle/${id}`, { isBookmarked });
export const searchPresentations = (searchData) => api.post('/sort/search', searchData);

// GPT 관련
export const generatePresentation = (data) => api.post('/bot/generate', data);

// OAuth2 관련
export const getOAuth2Success = () => api.get('/oauth2/success');

export default api;