import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { addPresentation } from '../../services/api';  // 서버와의 통신을 위한 함수 가져오기

const CreateSpeechPage = ({ showModal, isLoggedIn, onLogout, savedPresentation }) => {
  const [title, setTitle] = useState(savedPresentation?.title || ''); // 이전 상태 유지
  const [body, setBody] = useState(savedPresentation?.body || '');  // 이전 상태 유지
  const [speed_minute, setSpeedMinute] = useState(savedPresentation?.speed?.speed_minute || '');
  const [speed_second, setSpeedSecond] = useState(savedPresentation?.speed?.speed_second || '');
  const [speed_check, setSpeedCheck] = useState(savedPresentation?.speed?.speed_check || false);
  const navigate = useNavigate();

  const handleCreateSpeech = async () => {
    if (title && body) {
      if (body.length < 150) {
        alert('본문은 최소 150자 이상 입력해주세요!');
        return;
      }

      let estimatedDuration = 0;
      if (speed_check && speed_minute && speed_second) {
        estimatedDuration = parseInt(speed_minute, 10) * 60 + parseInt(speed_second, 10);
      } else {
        const wordsPerMinute = 100;
        const wordCount = body.trim().split(/\s+/).length;
        estimatedDuration = Math.ceil((wordCount / wordsPerMinute) * 60);
      }

      try {
        // 서버로 전송할 발표문 데이터를 API 요구 형식에 맞게 설정
        const presentationData = {
          title: title,  // 발표 제목
          body: body,    // 발표 내용
          isBookmarked: false,  // 기본값으로 false 설정
          speed: {
            speed_check: speed_check,
            speed_minute: speed_check ? parseInt(speed_minute, 10) : Math.floor(estimatedDuration / 60),
            speed_second: speed_check ? parseInt(speed_second, 10) : (estimatedDuration % 60),
          },
        };

        // 서버에 발표문 추가 요청
        const response = await addPresentation(presentationData);
        console.log('발표문 생성 성공:', response);

        // 모달 표시 및 데이터 전달
        showModal({
          title,
          body,
          speed_minute: speed_check ? speed_minute : Math.floor(estimatedDuration / 60).toString(),
          speed_second: speed_check ? speed_second : (estimatedDuration % 60).toString(),
          speed_check,
          estimatedDuration: response.data.estimatedDuration || estimatedDuration, // 서버 응답에서 예상 시간을 사용, 없으면 계산한 시간
        });
      } catch (error) {
        console.error('발표문 생성 실패:', error.response || error);
        alert('발표문 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('제목과 본문 작성을 완료해주세요!');
    }
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="cr-create-speech-container">
      <div className="cr-create-speech-header">
        <div className="cr-create-speech-header-left">
          <span className="cr-create-speech-back-button" onClick={() => navigate('/')}>
            &#8592;
          </span>
          <span className="cr-create-speech-header-title">위스와 발표하기</span>
        </div>
      </div>
      
      <div className="cr-create-speech-content-frame">
        <div className="cr-create-speech-content">
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
          
          <div className="cr-create-speech-input-group">
            <label className="cr-create-speech-label">본문 작성</label>
            <textarea
              placeholder="본문을 작성해주세요. (150 ~ 1000자)"
              className="cr-create-speech-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={1000}
            />
          </div>
          
          <div className="cr-create-speech-input-group">
            <div className="cr-create-speech-time-setting">
              <input
                type="checkbox"
                className="cr-create-speech-checkbox"
                checked={speed_check}
                onChange={(e) => setSpeedCheck(e.target.checked)}
                id="timeCheck"
              />
              <label htmlFor="timeCheck" className="cr-create-speech-time-label">시간 설정</label>
            </div>
            {speed_check && (
              <div className="cr-create-speech-time-inputs">
                <input
                  type="number"
                  placeholder="예시) 1"
                  className="cr-create-speech-time-input"
                  value={speed_minute}
                  onChange={(e) => setSpeedMinute(e.target.value)}
                />
                <span className="cr-create-speech-time-span">분</span>
                <input
                  type="number"
                  placeholder="예시) 30"
                  className="cr-create-speech-time-input"
                  value={speed_second}
                  onChange={(e) => setSpeedSecond(e.target.value)}
                />
                <span className="cr-create-speech-time-span">초</span>
              </div>
            )}
          </div>
          
          <hr className="cr-create-speech-divider" />
          
          <div className="cr-create-speech-notice-container">
            <div className="cr-create-speech-notice-title">* 주의사항</div>
            <div className="cr-create-speech-notice">
              박스 미체크 시 기본 속도로 생성됩니다. 시간을 설정하고 싶다면 상단 박스를 체크해주세요.
            </div>
          </div>
          
          <button className="cr-create-speech-button" onClick={handleCreateSpeech}>
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpeechPage;
