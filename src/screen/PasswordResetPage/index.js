import React, { useState } from 'react';
import './style.css';
import logoImage from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { sendVerificationCode, resetPassword } from '../../services/api';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = '이메일을 입력해주세요.';
    if (!verificationCode) newErrors.verificationCode = '인증코드를 입력해주세요.';
    if (!newPassword) newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendVerificationCode = async () => {
    if (!email) {
      setErrors({ email: '이메일을 입력해주세요.' });
      return;
    }
    try {
      const response = await sendVerificationCode(email);
      console.log('Server response:', response);
      setMessage(response.data.message || '인증 코드가 전송되었습니다.');
    } catch (error) {
      console.error('인증코드 전송 실패:', error.response || error);
      setErrors({ email: error.response?.data?.message || '인증코드 전송에 실패했습니다.' });
    }
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    try {
      const response = await resetPassword(email, verificationCode, newPassword);
      setMessage(response.data.message || '비밀번호가 성공적으로 재설정되었습니다.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
      setErrors({ general: error.response?.data?.message || '비밀번호 재설정에 실패했습니다.' });
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
          <input
            type="text"
            placeholder="인증코드"
            className="p-input-field"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          {errors.verificationCode && <div className="p-error-message">{errors.verificationCode}</div>}
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
          {message && <div className="p-success-message">{message}</div>}
          {errors.general && <div className="p-error-message">{errors.general}</div>}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;