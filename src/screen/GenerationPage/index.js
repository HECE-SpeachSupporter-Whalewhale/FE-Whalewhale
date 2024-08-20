import React, { useState } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const GenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title = '2024', content = '안녕하세요.' } = location.state || {};

  const handleEdit = () => {
    alert('구현되지 않은 기능입니다');  // "수정하기" 버튼 클릭 시 경고창 표시
  };

  const handlePublish = () => {
    alert('구현되지 않은 기능입니다');  // "발표하기" 버튼 클릭 시 경고창 표시
  };

  const handleBack = () => {
    navigate('/');  // "뒤로가기" 버튼 클릭 시 홈 페이지로 이동
  };

  return (
    <div className="generation-container">
      <header className="generation-header">
        <div className="generation-header-left">
          <span className="generation-back-button" onClick={handleBack}>&#8592;</span>
          <span className="generation-header-title">발표0810ver.</span>
          <span className="generation-edit-button" onClick={handleEdit}>&#9998;</span>
        </div>
      </header>
      <div className="generation-content-frame">
        <div className="generation-content">
          <div className="generation-input-group">
            <label className="generation-label">제목</label>
            <input type="text" value={title} readOnly className="generation-input title-box"/>
          </div>
          <div className="generation-input-group">
            <label className="generation-label">발표문</label>
            <textarea value={content} readOnly className="generation-textarea frame"></textarea>
          </div>
          <div className="generation-input-group generation-time-inputs">
            <label className="generation-label"></label>
            <div className="generation-time-inputs-wrapper">
              <input type="number" placeholder="예시) 1" className="generation-time-input" />
              <span className="generation-time-span">분</span>
              <input type="number" placeholder="예시) 30" className="generation-time-input" />
              <span className="generation-time-span">초</span>
            </div>
          </div>
          <div className="generation-button-group">
            <button className="generation-button" onClick={handleEdit}>수정하기</button>
            <button className="generation-button" onClick={handlePublish}>발표하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerationPage;