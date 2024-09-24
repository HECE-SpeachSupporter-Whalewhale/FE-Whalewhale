import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://whalewhale-env-1.eba-c3mypkxm.ap-northeast-2.elasticbeanstalk.com';

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

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/login', credentials);
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw error;
  }
};
export const register = (userData) => api.post('/api/users', userData);
export const sendVerificationEmail = (data) => api.post('/email/send', data);
export const verifyEmail = (data) => api.post('/email/verify', data);
export const completeProfile = (userData) => api.post('/complete-profile', userData);
export const sendVerificationCode = (data) => api.post('/password/forgot', data);
export const resetPassword = (data) => api.post('/password/reset', data);

// 프레젠테이션 관련
export const getPresentations = () => api.get('/search');
export const addPresentation = (presentationData) => api.post('/api/presentations/add', presentationData);
export const deletePresentation = (id) => api.delete(`/presentations/delete/${id}`);
export const toggleBookmark = (id, isBookmarked) => api.post(`/bookmarks/toggle/${id}`, { isBookmarked });
export const searchPresentations = (searchData) => api.post('/sort/search', searchData);

// GPT 관련
export const generatePresentation = (data) => api.post('/bot/generate', data);

// OAuth2 관련
export const getOAuth2Success = () => api.get('/oauth2/success');

export default api;