/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { generatePresentation } from '../../services/api';

const HelpWithSpeechPage = ({ showModal }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [speed_minute, setSpeedMinute] = useState('');
  const [speed_second, setSpeedSecond] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    k1: '',
    k2: '',
    k3: '',
    k4: ''
  });
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleCreateSpeech = async () => {
    if (title && body) {
      if (body.length < 150) {
        alert('본문은 최소 150자 이상 입력해주세요!');
        return;
      }

      setLoading(true); // 로딩 상태를 true로 설정

      try {
        // API 요청을 위한 데이터 준비
        const requestData = {
          title,
          body,
          keyword_name: [formData.k1, formData.k2, formData.k3, formData.k4],
          speed_minute: isChecked ? parseInt(speed_minute, 10) : 0,
          speed_second: isChecked ? parseInt(speed_second, 10) : 0,
          user_job: selectedOption // 사용자의 직업
        };

        // API 호출
        const response = await generatePresentation(requestData);

       // HelpWithSpeechPage의 handleCreateSpeech 함수 내부
if (response.status === 200) {
  const result = response.data.choices[0].message.content;
  navigate('/generation', {
    state: {
      gptResponse: {
        title: result.title || title,
        body: result.body || body,
        speed_minute: result.speed_minute || speed_minute,
        speed_second: result.speed_second || speed_second
      }
    }
  });
}else {
          alert('대본 생성에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        alert('API 요청 중 오류가 발생했습니다.');
        console.error('Error generating presentation:', error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    } else {
      alert('제목과 본문 작성을 완료해주세요!');
    }
  };

  const handle = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNumberInput = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <div className="he-page-container">
      <div className="he-header">
        <div className="he-header-left">
          <span className="he-back-button" onClick={() => navigate('/')}>
            &#8592;
          </span>
          <span className="he-header-title">위스의 도움받기</span>
        </div>
      </div>
      <div className="he-page-content">
        <div className="he-form-container">
          <div className="he-input-group">
            <label className="he-label">제목</label>
            <input
              type="text"
              placeholder="제목을 입력해 주세요 (최대 10자)"
              className="he-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={10}
            />
          </div>
          <div className="he-input-group">
            <label className="he-label">본문</label>
            <textarea
              placeholder="본문을 작성해 주세요.(150~1000자)"
              className="he-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={1000}
            />
          </div>
          <div className="he-input-group">
            <label className="he-label">키워드</label>
            <div className="he-keyword-container">
              <input
                type="text"
                placeholder="키워드#1  (5글자 안으로 적어주세요!)"
                className="he-input"
                value={formData.k1}
                onChange={handleChange}
                name="k1"
                maxLength={5}
              />
              <input
                type="text"
                placeholder="키워드#2"
                className="he-input"
                value={formData.k2}
                onChange={handleChange}
                name="k2"
                maxLength={5}
              />
              <input
                type="text"
                placeholder="키워드#3"
                className="he-input"
                value={formData.k3}
                onChange={handleChange}
                name="k3"
                maxLength={5}
              />
              <input
                type="text"
                placeholder="키워드#4"
                className="he-input"
                value={formData.k4}
                onChange={handleChange}
                name="k4"
                maxLength={5}
              />
            </div>
          </div>
          <div className="he-input-group">
            <label className="he-label">사용자 유형</label>
            <select className="he-select" value={selectedOption} onChange={handle}>
              <option value="" disabled>사용자 유형을 선택해 주세요</option>
              <option value="학생">학생</option>
              <option value="직장인">직장인</option>
              <option value="그외..">그외..</option>
            </select>
          </div>
          <div className="he-input-group">
            <div className="he-time-checkbox-group">
              <label className="he-label">시간 설정</label>
              <input
                type="checkbox"
                className="he-speech-checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            {isChecked && (
              <div className="he-time-inputs">
                <input
                  type="number"
                  placeholder="예시) 1"
                  className="he-time-input"
                  value={speed_minute}
                  onChange={(e) => setSpeedMinute(e.target.value)}
                  onKeyDown={handleNumberInput}
                  max={20}
                />
                <span className="he-time-span">분</span>
                <input
                  type="number"
                  placeholder="예시) 30"
                  className="he-time-input"
                  value={speed_second}
                  onChange={(e) => setSpeedSecond(e.target.value)}
                  onKeyDown={handleNumberInput}
                  max={60}
                />
                <span className="he-time-span">초</span>
              </div>
            )}
          </div>
          <hr className="he-divider" />
          <div className="he-notice-container">
            <div className="he-notice-title">* 주의사항</div>
            <div className="he-notice">
              박스 미체크 시 기본 속도로 생성됩니다. 시간을 설정하고 싶다면 상단 박스를 체크해주세요.
            </div>
          </div>
          <button className="he-button" onClick={handleCreateSpeech}>
            완료
          </button>
        </div>
      </div>

      {/* 로딩 팝업창 */}
      {loading && (
        <div className="loading-popup">
          <div className="loading-content">결과를 생성 중입니다. 잠시만 기다려주세요...</div>
        </div>
      )}
    </div>
  );
};

export default HelpWithSpeechPage;