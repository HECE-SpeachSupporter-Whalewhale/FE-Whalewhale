import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import mobileLogoImage from '../../images/logo.png';
import webLogoImage from '../../images/logo2.png';

const LoginPage = ({ login }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const passwordInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }
    if (email === 'qwer@naver.com' && password === 'qwer1234') {
      console.log('로그인 성공');
      login({ email });
      navigate('/');
    } else {
      console.error('로그인 실패');
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
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
            placeholder="이메일을 입력해주세요."
            className="log-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleUsernameKeyPress}
          />
          {errors.email && <div className="log-error-message">{errors.email}</div>}
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="log-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyPress}
            ref={passwordInputRef}
          />
          {errors.password && <div className="log-error-message">{errors.password}</div>}
          <button className="log-button" onClick={handleLogin}>로그인</button>
          <div className="log-additional-options">
            <span>계정이 없으신가요?</span>
            <span className="log-auth-links">
              <a href="/register">회원가입</a> | <a href="/forgot-password">비밀번호 찾기</a>
            </span>
          </div>
          <button className="log-google-button">구글로 로그인하기</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;