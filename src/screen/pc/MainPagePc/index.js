import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoImage from '../../../images/logo.png';
import mainImage from '../../../images/main.png';
import image1 from '../../../images/announce.png';
import image2 from '../../../images/help.png';
import image3 from '../../../images/memory.png';

const MainPagePc = ({ isLoggedIn, user, logout }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(mainImage);

  const handleCreateSpeechPage = () => {
    navigate('/create');
  };

  const handleHelpWithSpeech = () => {
    navigate('/help-with-speech');
  };

  const handleViewMemories = () => {
    navigate('/view-memories');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };

  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  const handleMouseLeave = () => {
    setCurrentImage(mainImage);
  };

  return (
    <div className="main-page-container-Pc">
      <div className="header-Pc">
        <div className="main-logo-container-Pc">
          <img src={logoImage} alt="고래고래" className="main-logo-Pc" onClick={handleLogoClick} />
        </div>
        <div className="auth-buttons-Pc">
          {isLoggedIn ? (
            <>
              <button className="auth-button-Pc user-button-Pc">사용자님</button>
              <button className="auth-button-Pc" onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <button className="auth-button-Pc" onClick={handleLogin}>로그인</button>
              <button className="auth-button-Pc" onClick={handleRegister}>회원가입</button>
            </>
          )}
        </div>
      </div>
      <div className="content-Pc">
        <div className="image-container-Pc">
          <img src={currentImage} alt="메인 이미지" className="main-image-Pc" />
        </div>
        <div className="button-container-Pc">
          <button
            className="main-button-Pc"
            onClick={handleCreateSpeechPage}
            onMouseEnter={() => handleMouseEnter(image1)}
            onMouseLeave={handleMouseLeave}
          >
            WIS와 발표하기
          </button>
          {isLoggedIn ? (
            <button
              className="main-button-Pc"
              onClick={handleHelpWithSpeech}
              onMouseEnter={() => handleMouseEnter(image2)}
              onMouseLeave={handleMouseLeave}
            >
              WIS의 도움받기
            </button>
          ) : (
            <button className="main-button-Pc locked-button-Pc" onClick={handleLogin}>
              🔒 WIS의 도움받기
            </button>
          )}
          {isLoggedIn ? (
            <button
              className="main-button-Pc"
              onClick={handleViewMemories}
              onMouseEnter={() => handleMouseEnter(image3)}
              onMouseLeave={handleMouseLeave}
            >
              추억 살펴보기
            </button>
          ) : (
            <button className="main-button-Pc locked-button-Pc" onClick={handleLogin}>
              🔒 추억 살펴보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPagePc;