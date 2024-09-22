import axios from 'axios';

const API_BASE_URL = '/api';  // 프록시 설정으로 인해 상대 경로 사용

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함하여 요청을 전송
});

// 요청 시 토큰을 헤더에 자동으로 포함하기 위한 인터셉터 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 시 에러 처리를 위한 인터셉터 설정
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

// 로그인 요청 함수
export const login = async (credentials) => {
  try {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post('/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Login response:', response);

    // 로그인 성공 시 토큰 및 사용자 정보 저장
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

// 회원가입 요청 함수
export const register = (userData) => api.post('/users', userData);
export const sendVerificationEmail = (data) => api.post('/email/send', data);
export const verifyEmail = (data) => api.post('/email/verify', data);
export const completeProfile = (userData) => api.post('/complete-profile', userData);
export const sendVerificationCode = (data) => api.post('/password/forgot', data);
export const resetPassword = (data) => api.post('/password/reset', data);
export const getPresentations = () => api.get('/search');
export const addPresentation = (presentationData) => api.post('/presentations/add', presentationData);
export const deletePresentation = (id) => api.delete(`/presentations/delete/${id}`);
export const toggleBookmark = (id, isBookmarked) => api.post(`/bookmarks/toggle/${id}`, { isBookmarked });
export const searchPresentations = (searchData) => api.post('/sort/search', searchData);
export const generatePresentation = (data) => api.post('/bot/generate', data);

// OAuth2 로그인 성공 후 사용자 정보를 가져오는 함수
export const getOAuth2Success = async () => {
  try {
    const response = await api.get('/oauth2/success', {
      headers: {
        'Accept': 'application/json',
      },
    });

    // OAuth2 로그인 성공 시 토큰 및 사용자 정보 저장
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

// Axios 인스턴스 내보내기
export default api;