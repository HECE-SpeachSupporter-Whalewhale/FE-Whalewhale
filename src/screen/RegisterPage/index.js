import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { register as apiRegister, sendVerificationEmail, verifyEmail } from '../../services/api';
import './style.css';
import logoImage from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  nickname: yup.string().required('이름을 입력해주세요').max(4, '닉네임은 4자 이하여야 합니다'),
  username: yup.string().email('올바른 이메일 형식을 입력해주세요').required('이메일을 입력해주세요'),
  password: yup.string().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    '비밀번호는 영문자, 숫자, 특수문자를 혼합하여 8자 이상이어야 합니다'
  ).required('비밀번호를 입력해주세요'),
  user_job: yup.string().required('소속기관을 선택해주세요'),
  verificationCode: yup.string().required('인증코드를 입력해주세요'),
});

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(schema),
  });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    const email = getValues('username');
    if (email) {
      try {
        const response = await sendVerificationEmail(email);
        setIsVerificationSent(true);
        alert(response.data.message || '인증 코드가 이메일로 전송되었습니다.');
      } catch (error) {
        console.error('인증 코드 전송 실패:', error);
        alert(error.response?.data?.message || '인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('이메일을 입력해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    const email = getValues('username');
    const code = getValues('verificationCode');
    if (email && code) {
      try {
        const response = await verifyEmail(email, code);
        setIsVerified(response.data.isValid);
        alert(response.data.message);
      } catch (error) {
        console.error('인증 실패:', error);
        alert(error.response?.data?.message || '인증에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('이메일과 인증 코드를 입력해주세요.');
    }
  };

  const onSubmit = async (data) => {
    if (!isVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    try {
      const response = await apiRegister(data);
      console.log('회원가입 성공', response);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패', error);
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <div className="register-logo-container">
          <img 
            src={logoImage} 
            alt="고래고래" 
            className="register-logo-image" 
            onClick={() => navigate('/')} 
          />
        </div>
        <button className="register-login-button" onClick={() => navigate('/login')}>
          로그인
        </button>
      </div>
      <div className="register-content">
        <h2 className="register-title">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form-container">
          <input type="text" placeholder="이름을 입력해주세요" className="register-input-field" {...register('nickname')} />
          <p className="register-error-message">{errors.nickname?.message}</p>

          <input type="email" placeholder="이메일을 입력해주세요" className="register-input-field" {...register('username')} />
          <p className="register-error-message">{errors.username?.message}</p>

          <input type="password" placeholder="비밀번호를 입력해주세요" className="register-input-field" {...register('password')} />
          <p className="register-error-message">{errors.password?.message}</p>

          <select className="register-input-field" {...register('user_job')}>
            <option value="">소속기관을 선택해주세요</option>
            <option value="기관1">기관1</option>
            <option value="기관2">기관2</option>
          </select>
          <p className="register-error-message">{errors.user_job?.message}</p>

          <div className="register-verification-container">
            <input type="text" placeholder="인증코드" className="register-input-field register-verification-input" {...register('verificationCode')} />
            <button type="button" className="register-verify-button" onClick={isVerificationSent ? handleVerifyCode : handleSendVerification}>
              {isVerificationSent ? '인증' : '인증코드 전송'}
            </button>
          </div>
          <p className="register-error-message">{errors.verificationCode?.message}</p>

          <button type="submit" className="register-submit-button" disabled={!isVerified}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;