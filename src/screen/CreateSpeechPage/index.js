// CreateSpeechPage/index.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

const CreateSpeechPage = ({ showModal }) => {
  // 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // 발표 생성 처리 함수
  const handleCreateSpeech = () => {
    if (title && content) {
      if (content.length < 150) {
        alert('본문은 최소 150자 이상 입력해주세요!');
        return;
      }
      let estimatedDuration = 0;
      if (isChecked && minutes && seconds) {
        estimatedDuration = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
      } else {
        // 기본 속도로 예상 시간 계산 (예: 1분당 100자 기준)
        const wordsPerMinute = 100;
        const wordCount = content.trim().split(/\s+/).length;
        estimatedDuration = Math.ceil((wordCount / wordsPerMinute) * 60);
      }
      showModal({ title, content, estimatedDuration });
    } else {
      alert('제목과 본문 작성을 완료해주세요!');
    }
  };

  return (
    <div className="cr-create-speech-container">
      {/* 헤더 섹션 */}
      <div className="cr-create-speech-header">
        <div className="cr-create-speech-header-left">
          <span className="cr-create-speech-back-button" onClick={() => navigate('/')}>
            &#8592;
          </span>
          <span className="cr-create-speech-header-title">위스와 발표하기</span>
        </div>
        <Link to="/login" className="cr-create-speech-login-button">로그인</Link>
      </div>
      
      {/* 콘텐츠 섹션 */}
      <div className="cr-create-speech-content-frame">
        <div className="cr-create-speech-content">
          {/* 제목 입력 */}
          <div className="cr-create-speech-input-group">
            <label className="cr-create-speech-label">제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요. (10자 이내)"
              className="cr-create-speech-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={1}
              maxLength={10}
            />
          </div>
          
          {/* 본문 작성 */}
          <div className="cr-create-speech-input-group">
            <label className="cr-create-speech-label">본문 작성</label>
            <textarea
              placeholder="본문을 작성해주세요. (150 ~ 1000자)"
              className="cr-create-speech-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
            />
          </div>
          
          {/* 시간 설정 */}
          <div className="cr-create-speech-input-group">
            <div className="cr-create-speech-time-setting">
              <input
                type="checkbox"
                className="cr-create-speech-checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                id="timeCheck"
              />
              <label htmlFor="timeCheck" className="cr-create-speech-time-label">시간 설정</label>
            </div>
            {/* 모바일 화면에서 시간 설정 입력 필드와 분, 초 표시 */}
            {isChecked && (
              <div className="cr-create-speech-time-inputs">
                <input
                  type="number"
                  placeholder="예시) 1"
                  className="cr-create-speech-time-input"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
                <span className="cr-create-speech-time-span">분</span>
                <input
                  type="number"
                  placeholder="예시) 30"
                  className="cr-create-speech-time-input"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                />
                <span className="cr-create-speech-time-span">초</span>
              </div>
            )}
          </div>
          
          {/* 구분선 */}
          <hr className="cr-create-speech-divider" />
          
          {/* 주의사항 */}
          <div className="cr-create-speech-notice-container">
            <div className="cr-create-speech-notice-title">* 주의사항</div>
            <div className="cr-create-speech-notice">
              박스 미체크 시 기본 속도로 생성됩니다. 시간을 설정하고 싶다면 상단 박스를 체크해주세요.
            </div>
          </div>
          
          {/* 생성 버튼 */}
          <button className="cr-create-speech-button" onClick={handleCreateSpeech}>
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpeechPage;