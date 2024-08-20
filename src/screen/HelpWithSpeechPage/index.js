/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const HelpWithSpeechPage = ({ showModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    k1: '',
    k2: '',
    k3: '',
    k4: ''
  });
  const navigate = useNavigate();

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
        const wordsPerMinute = 100;
        const wordCount = content.trim().split(/\s+/).length;
        estimatedDuration = Math.ceil((wordCount / wordsPerMinute) * 60);
      }
      showModal({ title, content, estimatedDuration });
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
        <span className="he-back-button" onClick={() => navigate('/')}>
          &#8592;
        </span>
        <span className="he-header-title">대본 수정</span>
      </div>
      <div className="he-page-content-frame">
        <div className="he-page-content">
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
            />
          </div>
          <div className="he-input-group">
            <label className="he-label">키워드</label>
            <div className="he-keyword-container">
              <input
                type="text"
                placeholder="키워드#1"
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
              <option value="option1">학생</option>
              <option value="option2">직장인</option>
              <option value="option3">그외..</option>
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
                  placeholder="분"
                  className="he-time-input"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  onKeydown={handleNumberInput}
                  max={20}
                />
                <span className="he-time-span">분</span>
                <input
                  type="number"
                  placeholder="초"
                  className="he-time-input"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  onKeydown={handleNumberInput}
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
    </div>
  );
};

export default HelpWithSpeechPage;
