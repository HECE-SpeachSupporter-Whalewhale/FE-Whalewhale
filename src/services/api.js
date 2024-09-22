import axios from 'axios';

const API_BASE_URL = '/api';

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        nickname: response.data.nickname,
      }));
    }
    return response;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw error;
  }
};

export const register = (userData) => api.post('/users', userData);

export const sendVerificationEmail = (email) => api.post('/email/send', { email });

export const verifyEmail = (email, code) => api.post('/email/verify', { email, code });

export const completeProfile = (userData) => api.post('/complete-profile', userData);

export const sendVerificationCode = (email) => api.post('/password/forgot', { email });

export const resetPassword = (email, code, newPassword) => 
  api.post('/password/reset', { email, code, newPassword });

export const getPresentations = () => api.get('/search');

export const addPresentation = (presentationData) => api.post('/presentations/add', presentationData);

export const deletePresentation = (id) => api.delete(`/presentations/delete/${id}`);

export const toggleBookmark = (id, isBookmarked) => api.post(`/bookmarks/toggle/${id}`, { isBookmarked });

export const searchPresentations = (searchData) => api.post('/sort/search', searchData);

export const generatePresentation = (data) => api.post('/bot/generate', data);

export const getOAuth2Success = async () => {
  try {
    const response = await api.get('/oauth2/success', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.data) {
      localStorage.setItem('token', response.data.token || '');
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username,
        nickname: response.data.nickname,
        user_job: response.data.user_job,
        isAdmin: response.data.isAdmin,
      }));
    }
    return response;
  } catch (error) {
    console.error('OAuth2 success error:', error.response || error);
    throw error;
  }
};

export default api;