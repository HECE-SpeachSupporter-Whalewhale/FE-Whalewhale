// RegisterPage/index.js
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './style.css';
import logoImage from '../../../images/logo.png';  // 로고 이미지 임포트
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요'),
  email: yup.string().email('올바른 이메일 형식을 입력해주세요').required('이메일을 입력해주세요'),
  password: yup.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다').required('비밀번호를 입력해주세요'),
  domain: yup.string().required('도메인을 선택해주세요'),
  institution: yup.string().required('소속기관을 선택해주세요'),
  verificationCode: yup.string().required('인증코드를 입력해주세요'),
});

const RegisterPage = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [emailDomain, setEmailDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const navigate = useNavigate();

  const handleDomainChange = (event) => {
    if (event.target.value === 'custom') {
      setIsCustomDomain(true);
      setEmailDomain('');
    } else {
      setIsCustomDomain(false);
      setEmailDomain(event.target.value);
    }
  };

  const handleCustomDomainChange = (event) => {
    setCustomDomain(event.target.value);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      email: `${data.email}@${data.domain === 'custom' ? customDomain : data.domain}`,
    };
    axios.post('/api/register', payload)
      .then(response => {
        console.log(response.data);
        // handle success
      })
      .catch(error => {
        console.error(error);
        // handle error
      });
  };

  return (
    <div className="register-container">
      <div className="register-logo">
        <img 
          src={logoImage} 
          alt="고래고래" 
          className="register-logo-image" 
          onClick={() => navigate('/')} 
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <input type="text" placeholder="이름을 입력해주세요" className="input-field" {...register('name')} />
        <p>{errors.name?.message}</p>

        <div className="email-container">
          <input type="email" placeholder="이메일을 입력해주세요" className="input-field email-input" {...register('email')} />
          <span className="at-symbol">@</span>
          {isCustomDomain ? (
            <input
              type="text"
              placeholder="도메인 입력"
              className="input-field email-custom-input"
              value={customDomain}
              onChange={handleCustomDomainChange}
            />
          ) : (
            <select className="input-field email-select" value={emailDomain} {...register('domain')} onChange={handleDomainChange}>
              <option value="">도메인 선택</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="custom">직접 입력</option>
            </select>
          )}
        </div>
        <p>{errors.email?.message || errors.domain?.message}</p>

        <input type="password" placeholder="비밀번호를 입력해주세요" className="input-field" {...register('password')} />
        <p>{errors.password?.message}</p>

        <select className="input-field" {...register('institution')}>
          <option value="">소속기관을 선택해주세요</option>
          <option value="기관1">기관1</option>
          <option value="기관2">기관2</option>
        </select>
        <p>{errors.institution?.message}</p>

        <div className="verification-container">
          <input type="text" placeholder="인증코드" className="input-field verification-input" {...register('verificationCode')} />
          <button type="button" className="verify-button">인증</button>
        </div>
        <p>{errors.verificationCode?.message}</p>

        <button type="submit" className="register-button">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;