import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOAuth2Success } from '../services/api';

const OAuth2RedirectHandler = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getOAuth2Success();
        console.log('OAuth2 로그인 성공:', response.data);

        if (response.data && response.data.username) {
          onLogin({
            username: response.data.username,
            nickname: response.data.nickname || response.data.username,
            user_job: response.data.user_job,
            isAdmin: response.data.isAdmin,
          });
          navigate('/', { replace: true }); // 메인 페이지로 이동 (히스토리 대체)
        } else {
          console.error('Invalid user data:', response.data);
          navigate('/login', { replace: true }); // 유효하지 않은 데이터인 경우 로그인 페이지로 이동 (히스토리 대체)
        }
      } catch (error) {
        console.error('OAuth2 로그인 처리 실패', error);
        navigate('/login', { replace: true }); // 오류 발생 시 로그인 페이지로 이동 (히스토리 대체)
      }
    };

    fetchUserInfo();
  }, [navigate, onLogin]);

  return null;
};

export default OAuth2RedirectHandler;