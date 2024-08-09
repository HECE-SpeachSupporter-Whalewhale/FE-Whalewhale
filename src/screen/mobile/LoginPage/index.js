// LoginPage/index.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoImage from '../../../images/logo.png';

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

  const handlePasswordKeyPress = (event) => { // 엔터를 누를 시, 로그인
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-logo-container" onClick={handleLogoClick}>
        <img src={logoImage} alt="고래고래" className="login-logo" />
      </div>
      <input
        type="email"
        placeholder="이메일을 입력해주세요."
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleUsernameKeyPress} // 엔터를 누를 시, 비밀번호 입력 필드로 이동
      />
      {errors.email && <div className="error-message">{errors.email}</div>}
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handlePasswordKeyPress} // 엔터를 누를 시, 로그인
        ref={passwordInputRef} // 엔터누르면 밑으로 내려가도록
      />
      {errors.password && <div className="error-message">{errors.password}</div>}
      <button className="login-button" onClick={handleLogin}>로그인</button>
      <div className="additional-options">
        <span>계정이 없으신가요?</span>
        <span className="auth-links"><a href="/register">회원가입</a> | <a href="/forgot-password">비밀번호 찾기</a></span>
      </div>
      <button className="google-login-button">구글로 로그인하기</button>
    </div>
  );
};

export default LoginPage;