/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoImage from '../../../images/logo.png';

const HelpWithSpeechPagePc = () => {
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

  const [showCautionNotice, setShowCautionNotice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };

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
      setShowCautionNotice(true);
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

  const handleCheckmarkClick = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="he-page-container">
      <div className="he-header">
        <div className="he-logo-container-Pc">
          <img src={logoImage} alt="고래고래" className="he-logo-Pc" onClick={handleLogoClick} />
        </div>
      </div>
      <div className="he-page-content-frame">
        <div className="he-page-content">
          <div className="he-input-group">
          <span className="he-header-title">위스의 도움받기</span>
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
                  onKeyDown={handleNumberInput}
                  max={20}
                />
                <span className="he-time-span">분</span>
                <input
                  type="number"
                  placeholder="초"
                  className="he-time-input"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
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
      {showCautionNotice && (
        <div className="he-caution-notice">
          <div className="he-caution-notice-content">
            주의사항: 본문 내용이 최소 150자 이상이어야 합니다. 시간을 설정할 경우, 박스를 체크해야 합니다.
          </div>
        </div>
      )}
      {/* 오른쪽 상단에 툴팁과 체크마크 추가 */}
      <div className="he-tooltip-container" onClick={handleCheckmarkClick}>
        <span className="he-checkmark">✓</span>
        <span className="he-tooltiptext">주의사항 확인 필요!</span>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="he-modal-overlay" onClick={handleCloseModal}>
          <div className="he-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>주의사항</h2>
            <p>제목은 최대 10자 이상 적어주세요.</p>
            <p>본문은 150자 이상은 기본으로 작성하셔야합니다.(최대1000자)</p>
            <p>키워드는 각각 5글자까지 적을 수 있고, 4칸 다 적어주셔야합니다.</p>
            <p>제목은 최대 10자 이상 적어주세요.</p>
            <p>시간을 따로 설정을 안하시면 기본시간(@@분)으로 진행됩니다.</p>
            <button className="he-modal-close-button" onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpWithSpeechPagePc;
