/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import whaleGif from '../../../images/whale.gif';

const GeneratedSpeechPage = ({ speechData, hideModal }) => {
  const navigate = useNavigate();
  const { title, content, estimatedDuration } = speechData;

  const handleNavigateToPractice = () => {
    hideModal();
    navigate('/practice', { state: { title, content, estimatedDuration } });
  };

  const handleNavigateToGeneration = () => {
    hideModal();
    navigate('/generation', { state: { title, content, estimatedDuration } });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={hideModal}>&#x2715;</button>
        <h2>{title ? `제목: ${title}` : ''}</h2>
        <div className="gif-box">
          <img src={whaleGif} alt="Whale" className="whale-gif" />
        </div>
        <p className="generated-title">대본이 생성되었어요!</p>
        <p className="confirmation-text">대본을 확인하시겠어요?</p>
        <button className="modal-button" onClick={handleNavigateToGeneration}>확인하기</button>
        <button className="modal-button" onClick={handleNavigateToPractice}>발표하기</button>
      </div>
    </div>
  );
};

export default GeneratedSpeechPage;