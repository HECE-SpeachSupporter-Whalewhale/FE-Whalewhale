import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import mobileLogoImage from '../../images/logo3.png';
import webLogoImage from '../../images/logo2.png';
import { login as apiLogin } from '../../services/api';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const passwordInputRef = useRef(null);

  const validateForm = () => {
    if (!username) {
      setError('사용자 이름(이메일)을 입력해주세요.');
      return false;
    }
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      const response = await apiLogin({ username, password });
      console.log('로그인 성공', response);
      if (response.data && response.data.nickname) {
        onLogin({
          nickname: response.data.nickname,
          username: response.data.username
        });
        navigate('/');
      } else {
        setError('로그인 정보가 올바르지 않습니다. 서버 응답: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('로그인 실패', error);
      if (error.response) {
        setError(`로그인 실패: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        setError('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        setError('로그인 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleUsernameKeyPress = (event) => {
    if (event.key === 'Enter') {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="log-container">
      <div className="log-left">
        <div className="log-logo-container" onClick={handleLogoClick}>
          <img src={mobileLogoImage} alt="고래고래 (모바일)" className="log-logo mobile-logo" />
          <img src={webLogoImage} alt="고래고래 (웹)" className="log-logo web-logo" />
        </div>
      </div>
      <div className="log-right">
        <div className="log-form-container">
          <h2 className="log-title web-only">로그인</h2>
          <input
            type="email"
            placeholder="사용자 이름(이메일)을 입력해주세요."
            className="log-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameKeyPress}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="log-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyPress}
            ref={passwordInputRef}
          />
          {error && <div className="log-error-message">{error}</div>}
          <button className="log-button" onClick={handleLogin}>로그인</button>
          <div className="log-additional-options">
            <span>계정이 없으신가요?</span>
            <span className="log-auth-links">
              <a href="/register">회원가입</a> | <a href="/forgot-password">비밀번호 찾기</a>
            </span>
          </div>
          <button className="log-google-button" onClick={handleGoogleLogin}>구글로 로그인하기</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;