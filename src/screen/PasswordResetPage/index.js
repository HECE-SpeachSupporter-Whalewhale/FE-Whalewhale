import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import logoImage from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }
    if (!verificationCode) {
      newErrors.verificationCode = '인증코드를 입력해주세요.';
    }
    if (!newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendVerificationCode = async () => {
    if (!email) {
      setErrors({ email: '이메일을 입력해주세요.' });
      return;
    }
    try {
      const response = await axios.post('/api/send-verification-code', { email });
      setVerificationSent(true);
      console.log('인증코드 전송 성공:', response.data);
      alert('이메일로 인증코드가 전송되었습니다.');
    } catch (error) {
      console.error('인증코드 전송 실패:', error);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode === '654321') {
      setVerificationStatus('success');
    } else {
      setVerificationStatus('error');
    }
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('/api/reset-password', { email, verificationCode, newPassword });
      console.log('비밀번호 변경 성공:', response.data);
      // 성공 메시지 표시 또는 다른 로직 처리
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
    }
  };

  return (
    <div className="p-password-reset-container">
      <div className="p-header">
        <div className="p-logo-container">
          <img
            src={logoImage}
            alt="고래고래"
            className="p-logo-image"
            onClick={() => navigate('/')}
          />
        </div>
        <button className="p-login-button" onClick={() => navigate('/login')}>
          로그인
        </button>
      </div>
      <div className="p-content">
        <h2 className="p-title">비밀번호 찾기</h2>
        <div className="p-form-container">
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className="p-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="p-error-message">{errors.email}</div>}
          <button className="p-send-code-button" onClick={handleSendVerificationCode}>
            인증코드 전송
          </button>
          <div className="p-verification-container">
            <input
              type="text"
              placeholder="인증코드"
              className="p-input-field p-verification-input"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button className="p-verify-button" onClick={handleVerifyCode}>
              인증
            </button>
          </div>
          {verificationStatus === 'success' && (
            <div className="p-verification-success">인증이 완료되었어요!</div>
          )}
          {verificationStatus === 'error' && (
            <div className="p-verification-error">인증코드를 다시 입력해주세요.</div>
          )}
          <input
            type="password"
            placeholder="새 비밀번호를 입력해주세요."
            className="p-input-field"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <div className="p-error-message">{errors.newPassword}</div>}
          <input
            type="password"
            placeholder="새 비밀번호를 확인해주세요."
            className="p-input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div className="p-error-message">{errors.confirmPassword}</div>}
          <button className="p-reset-password-button" onClick={handleResetPassword}>
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;