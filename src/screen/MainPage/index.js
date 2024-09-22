import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoImage from '../../images/logo.png';
import titleImage from '../../images/title.png';
import mainWhaleImage from '../../images/main.png';
import buttonWhale1 from '../../images/announce.png';
import buttonWhale2 from '../../images/help.png';
import buttonWhale3 from '../../images/memory.png';
import mobileAnnounce from '../../images/mobile-announce.png';
import mobileHelp from '../../images/mobile-help.png';
import mobileMemory from '../../images/mobile-memory.png';
import loginIcon from '../../images/login.png';

const MainPage = ({ isLoggedIn, user, logout }) => {
  const navigate = useNavigate();

  const handleCreateSpeechPage = () => {
    navigate('/create');
  };

  const handleHelpWithSpeech = () => {
    if (isLoggedIn) {
      navigate('/help-with-speech');
    } else {
      alert('로그인 후 이용하실 수 있는 기능입니다.');
    }
  };

  const handleViewMemories = () => {
    if (isLoggedIn) {
      navigate('/view-memories');
    } else {
      alert('로그인 후 이용하실 수 있는 기능입니다.');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="ma-main-page-container">
      <div className="ma-header">
        <div className="ma-logo-container">
          <img src={logoImage} alt="고래고래" className="ma-logo" />
        </div>
        <div className="ma-login-container" onClick={isLoggedIn ? handleLogout : handleLogin}>
          <img src={loginIcon} alt="로그인" className="ma-login-icon" />
          {isLoggedIn && user ? (
            <span className="ma-user-info">
              <span className="ma-user-name">{user.nickname || user.username} 님</span>
              <span className="ma-logout-text"> | 로그아웃</span>
            </span>
          ) : (
            <span className="ma-login-text">로그인하기</span>
          )}
        </div>
      </div>
      <div className="ma-content">
        <div className="ma-main-section">
          <div className="ma-main-text">
            <img src={titleImage} alt="고래고래" className="ma-title-image" />
            <p>AI 기반의 맞춤형 발표 도우미 서비스</p>
            <p>실시간으로 발표 진행 상황을 확인하고,</p>
            <p>개인화된 피드백을 받아가세요!</p>
          </div>
          <img src={mainWhaleImage} alt="메인 고래" className="ma-main-image" />
        </div>
        <div className="ma-button-container">
          <button className="ma-main-button" onClick={handleCreateSpeechPage}>
            <span>WIS와 발표하기</span>
            <p>실시간 대본 표시 기능을 통한<br />시간 관리하기</p>
            <img src={buttonWhale1} alt="WIS와 발표하기" className="ma-button-image" />
            <img src={mobileAnnounce} alt="WIS와 발표하기" className="ma-button-image-mobile" />
          </button>
          <button className="ma-main-button" onClick={handleHelpWithSpeech}>
            <span>WIS 도움받기 {!isLoggedIn && '🔒'}</span>
            <p>AI를 활용한 가이드 분석과 사용자<br />맞춤형 대본 생성 및 분석</p>
            <img src={buttonWhale2} alt="WIS 도움받기" className="ma-button-image" />
            <img src={mobileHelp} alt="WIS 도움받기" className="ma-button-image-mobile" />
          </button>
          <button className="ma-main-button" onClick={handleViewMemories}>
            <span>WIS와의 추억 {!isLoggedIn && '🔒'}</span>
            <p>이전에 작성한 대본들의 효율적인<br />관리 및 검색</p>
            <img src={buttonWhale3} alt="WIS와의 추억" className="ma-button-image" />
            <img src={mobileMemory} alt="WIS와의 추억" className="ma-button-image-mobile" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;