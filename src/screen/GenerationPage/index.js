import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const GenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [speed_minute, setSpeedMinute] = useState('1'); // 기본값을 1로 설정
  const [speed_second, setSpeedSecond] = useState('30'); // 기본값을 30으로 설정

  useEffect(() => {
    if (location.state) {
      const { title = '', content = '', estimatedDuration = 90 } = location.state; // 'content'로 변경
      setTitle(title);
      setBody(content); // 여기서 'body' 대신 'content'로 변경
      // estimatedDuration이 있을 경우 분과 초로 변환하여 상태를 설정
      const minutes = Math.floor(estimatedDuration / 60).toString();
      const seconds = (estimatedDuration % 60).toString();
      setSpeedMinute(minutes);
      setSpeedSecond(seconds);
    }
  }, [location]);
  
  const handleEdit = () => {
    navigate('/create', { 
      state: { 
        title, 
        body, 
        speed_minute: speed_minute || '1', // 빈 값일 경우 기본값을 설정
        speed_second: speed_second || '30' // 빈 값일 경우 기본값을 설정
      } 
    });
  };

  const handleSave = () => {
    // Convert minutes and seconds to total seconds
    const totalMinutes = parseInt(speed_minute, 10) || 0; // 문자열을 안전하게 숫자로 변환
    const totalSeconds = parseInt(speed_second, 10) || 0; // 문자열을 안전하게 숫자로 변환
    const totalDuration = totalMinutes * 60 + totalSeconds;
    
    navigate('/practice', {
      state: {
        title,
        body,
        estimatedDuration: totalDuration
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
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            className="generation-textarea"
          />
        </div>
        <div className="generation-input-group">
          <label className="generation-label">시간</label>
          <div className="generation-time-inputs-wrapper">
            <input 
              type="number" 
              className="generation-time-input" 
              value={speed_minute}
              onChange={(e) => setSpeedMinute(e.target.value || '1')} // 빈 값일 경우 1로 설정
              min="0"
            />
            <span className="generation-time-span">분</span>
            <input 
              type="number" 
              className="generation-time-input" 
              value={speed_second}
              onChange={(e) => setSpeedSecond(e.target.value || '30')} // 빈 값일 경우 30으로 설정
              min="0"
              max="59" // 초는 0~59 사이로 제한
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