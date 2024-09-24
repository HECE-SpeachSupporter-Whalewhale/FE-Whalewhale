import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const GenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [speed_minute, setSpeedMinute] = useState('1');
  const [speed_second, setSpeedSecond] = useState('30');

  // 페이지 로드시 location.state에 있는 데이터를 가져와 설정합니다.
  useEffect(() => {
    if (location.state) {
      if (location.state.gptResponse) {
        const { title, body, speed_minute, speed_second } = location.state.gptResponse;
        setTitle(title || '');
        setBody(body || '');
        setSpeedMinute(speed_minute ? speed_minute.toString() : '1');
        setSpeedSecond(speed_second ? speed_second.toString() : '30');
      } else {
        const { title = '', body = '', speed_minute = '1', speed_second = '30', estimatedDuration } = location.state;
        setTitle(title);
        setBody(body);
        if (estimatedDuration) {
          setSpeedMinute(Math.floor(estimatedDuration / 60).toString());
          setSpeedSecond((estimatedDuration % 60).toString());
        } else {
          setSpeedMinute(speed_minute.toString());
          setSpeedSecond(speed_second.toString());
        }
      }
    }
  }, [location]);

  // 데이터를 저장하는 함수: 데이터를 로컬 스토리지에 저장하고 ViewMemoriesPage로 이동합니다.
  const handleSave = () => {
    const totalMinutes = parseInt(speed_minute, 10) || 0;
    const totalSeconds = parseInt(speed_second, 10) || 0;
    const totalDuration = totalMinutes * 60 + totalSeconds;

    // 이전에 저장된 발표문들을 가져옵니다.
    const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];
    const newSpeech = {
      title,
      body,
      estimatedDuration: totalDuration,
      createdAt: new Date().toISOString(), // 저장된 시간을 기록합니다.
    };

    // 새로운 데이터를 기존 데이터와 함께 로컬 스토리지에 저장합니다.
    localStorage.setItem('speeches', JSON.stringify([...savedSpeeches, newSpeech]));

    // 저장 후 ViewMemoriesPage로 이동합니다.
    navigate('/view-memories');
  };

  // 발표 버튼 클릭 시 Practice Page로 이동하는 함수
  const handlePractice = () => {
    const totalMinutes = parseInt(speed_minute, 10) || 0;
    const totalSeconds = parseInt(speed_second, 10) || 0;
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
              onChange={(e) => setSpeedMinute(e.target.value || '1')}
              min="0"
            />
            <span className="generation-time-span">분</span>
            <input 
              type="number" 
              className="generation-time-input" 
              value={speed_second}
              onChange={(e) => setSpeedSecond(e.target.value || '30')}
              min="0"
              max="59"
            />
            <span className="generation-time-span">초</span>
          </div>
        </div>
        <div className="generation-button-group">
          <button className="generation-button" onClick={handleSave}>저장하기</button> {/* 저장 버튼 */}
          <button className="generation-button" onClick={handlePractice}>발표하기</button> {/* 발표 버튼 */}
        </div>
      </div>
    </div>
  );
}

export default GenerationPage;
