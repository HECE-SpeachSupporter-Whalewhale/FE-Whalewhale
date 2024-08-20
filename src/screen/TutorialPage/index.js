import React from 'react';
import './style.css';
import whaleImage from '../../images/kindwhale.gif';

const TutorialPage = ({ onClose }) => {
  return (
    <>
      <div className="tutorial-overlay"></div>
      <div className="tutorial-page">
        <button className="tutorial-close-button" onClick={onClose}>×</button>
        <div className="tutorial-content">
          <div className="tutorial-header">
            <img src={whaleImage} alt="Wise Whale" className="tutorial-whale-image" />
            <div className="tutorial-speech-bubble">
              <p>고래고래로 발표 연습하는 방법 어렵지 않아요.</p>
              <p>위스가 하나씩 알려드릴게요!</p>
            </div>
          </div>
          <h2 className="tutorial-title">위스와 함께 발표문 연습하는 방법</h2>
          <div className="tutorial-steps-container">
            <ol className="tutorial-steps">
              <li>왼쪽 창에 뜨는 대본을 확인하며 발표 연습을 한다.</li>
              <li>자유롭게 대본 재생 또는 중지하며 진행한다.</li>
              <li>설정한 시간에 맞게 마무리한다.</li>
            </ol>
          </div>
          <div className="tutorial-footer">
            <p>성공적인 **님의 발표를 위해</p>
            <p>위스가 힘낼게요 화이팅이에요! :)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialPage;