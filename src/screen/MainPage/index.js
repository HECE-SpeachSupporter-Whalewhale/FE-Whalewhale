import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoImage from '../../images/logo.png';
import blankBoxImage from '../../images/main.png';
import image1 from '../../images/announce.png';
import image2 from '../../images/help.png';
import image3 from '../../images/memory.png';

const MainPage = ({ isLoggedIn, user, logout }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(blankBoxImage);

  // 발표 페이지로 이동하는 함수
  const handleCreateSpeechPage = () => {
    navigate('/create');
  };

  // 도움 페이지로 이동하는 함수
  const handleHelpWithSpeech = () => {
    navigate('/help-with-speech');
  };

  // 추억 페이지로 이동하는 함수
  const handleViewMemories = () => {
    navigate('/view-memories');
  };

  // 로그인 페이지로 이동하는 함수
  const handleLogin = () => {
    navigate('/login');
  };

  // 회원가입 페이지로 이동하는 함수
  const handleRegister = () => {
    navigate('/register');
  };

  // 로고 클릭 시 메인 페이지로 이동하고 새로고침하는 함수
  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };

  // 마우스 진입 시 이미지를 변경하는 함수
  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  // 마우스 떠날 시 이미지를 기본 이미지로 변경하는 함수
  const handleMouseLeave = () => {
    setCurrentImage(blankBoxImage);
  };

  return (
    <div className="ma-main-page-container">
      {/* 헤더 영역 */}
      <div className="ma-header">
        {/* 로고 컨테이너 */}
        <div className="ma-logo-container">
          <img src={logoImage} alt="고래고래" className="ma-logo" onClick={handleLogoClick} />
        </div>
        {/* 인증 버튼 컨테이너 */}
        <div className="ma-auth-buttons">
          {isLoggedIn ? (
            <>
              <button className="ma-auth-button ma-user-button">사용자님</button>
              <button className="ma-auth-button" onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <button className="ma-auth-button" onClick={handleLogin}>로그인</button>
              <button className="ma-auth-button" onClick={handleRegister}>회원가입</button>
            </>
          )}
        </div>
      </div>
      {/* 콘텐츠 영역 */}
      <div className="ma-content-frame">
        <div className="ma-content">
          {/* 이미지 컨테이너 */}
          <div className="ma-image-container">
            <img src={currentImage} alt="이미지" className="ma-image" />
          </div>
          {/* 버튼 컨테이너 */}
          <div className="ma-button-container">
            <button
              className="ma-main-button"
              onClick={handleCreateSpeechPage}
              onMouseEnter={() => handleMouseEnter(image1)}
              onMouseLeave={handleMouseLeave}
            >
              WIS와 발표하기
            </button>
            {isLoggedIn ? (
              <>
                <button
                  className="ma-main-button"
                  onClick={handleHelpWithSpeech}
                  onMouseEnter={() => handleMouseEnter(image2)}
                  onMouseLeave={handleMouseLeave}
                >
                  WIS의 도움받기
                </button>
                <button
                  className="ma-main-button"
                  onClick={handleViewMemories}
                  onMouseEnter={() => handleMouseEnter(image3)}
                  onMouseLeave={handleMouseLeave}
                >
                  추억 살펴보기
                </button>
              </>
            ) : (
              <>
                <button className="ma-main-button" onClick={handleLogin}>🔒 WIS의 도움받기</button>
                <button className="ma-main-button" onClick={handleLogin}>🔒 추억 살펴보기</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;