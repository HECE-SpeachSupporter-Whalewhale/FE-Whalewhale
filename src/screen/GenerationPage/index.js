import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const GenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [minutes, setMinutes] = useState('1');
  const [seconds, setSeconds] = useState('30');

  useEffect(() => {
    if (location.state) {
      const { title, content, estimatedDuration } = location.state;
      setTitle(title || '');
      setContent(content || '');
      if (estimatedDuration) {
        setMinutes(Math.floor(estimatedDuration / 60).toString());
        setSeconds((estimatedDuration % 60).toString());
      }
    }
  }, [location]);

  const handleEdit = () => {
    navigate('/create', { 
      state: { 
        title, 
        content, 
        minutes, 
        seconds 
      } 
    });
  };

  const handleSave = () => {
    // Convert minutes and seconds to total seconds
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    
    navigate('/practice', {
      state: {
        title,
        content,
        estimatedDuration: totalSeconds
      }
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="generation-container">
      <header className="generation-header">
        <span className="generation-back-button" onClick={handleBack}>&#8592;</span>
        <span className="generation-header-title">발표문 수정하기</span>
      </header>
      <div className="generation-content">
        <div className="generation-input-group">
          <label className="generation-label">제목을 수정해주세요.</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="generation-input title-box"
          />
        </div>
        <div className="generation-input-group">
          <label className="generation-label">발표문을 수정해주세요.</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="generation-textarea"
          />
        </div>
        <div className="generation-input-group">
          <label className="generation-label">시간</label>
          <div className="generation-time-inputs-wrapper">
            <input 
              type="number" 
              className="generation-time-input" 
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <span className="generation-time-span">분</span>
            <input 
              type="number" 
              className="generation-time-input" 
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
            <span className="generation-time-span">초</span>
          </div>
        </div>
        <div className="generation-button-group">
          <button className="generation-button" onClick={handleEdit}>수정하기</button>
          <button className="generation-button" onClick={handleSave}>발표하기</button>
        </div>
      </div>
    </div>
  );
}

export default GenerationPage;