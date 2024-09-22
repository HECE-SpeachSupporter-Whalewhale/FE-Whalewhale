import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TutorialPage from '../TutorialPage';
import './style.css';

const PracticeSpeechPage = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const { title, body, estimatedDuration } = location.state || {};
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formattedLines, setFormattedLines] = useState([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const speechContentRef = useRef(null);
  const progressBarRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const formatContent = useCallback((body, duration) => {
    const sentences = body.match(/[^.!?]+[.!?]+/g) || [];
    const totalCharacters = body.length;
    const averageSpeed = 4;
    const estimatedTotalTime = totalCharacters / averageSpeed;
    const timeRatio = duration / estimatedTotalTime;

    let startTime = 0;
    return sentences.map(sentence => {
      const trimmedSentence = sentence.trim();
      const sentenceLength = trimmedSentence.length;
      const sentenceDuration = (sentenceLength / averageSpeed) * timeRatio;
      const endTime = startTime + sentenceDuration;
      const result = {
        text: trimmedSentence,
        startTime: startTime,
        endTime: endTime
      };
      startTime = endTime;
      return result;
    });
  }, []);

  useEffect(() => {
    if (body && estimatedDuration) {
      const lines = formatContent(body, estimatedDuration);
      setFormattedLines(lines);
    } else {
      alert('발표 데이터를 불러오는데 문제가 발생했습니다.');
      navigate('/');
    }
  }, [body, estimatedDuration, formatContent, navigate]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= estimatedDuration) {
            clearInterval(timerRef.current);
            setIsPlaying(false);
            return estimatedDuration;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, estimatedDuration]);

  useEffect(() => {
    if (isPlaying) {
      const highlightedElement = speechContentRef.current.querySelector('.pr-highlight');
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, isPlaying]);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const handleProgressClick = useCallback((event) => {
    const progressBar = progressBarRef.current;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentage = clickPosition / progressBarWidth;
    const newTime = Math.floor(percentage * estimatedDuration);
    setCurrentTime(newTime);
  }, [estimatedDuration]);

  const handlePlayClick = useCallback(() => {
    if (currentTime >= estimatedDuration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  }, [currentTime, estimatedDuration, isPlaying]);

  const handleReset = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="pr-practice-speech-container">
      <div className="pr-practice-speech-page">
        <div className="pr-header">
          <span className="pr-back-button" onClick={() => navigate('/')}>
            &#8592;
          </span>
          <span className="pr-header-title">{title}</span>
          <div className="pr-header-buttons">
            <button onClick={toggleTutorial} className="pr-help-button">도움말</button>
          </div>
        </div>
        <div className="pr-speech-content" ref={speechContentRef}>
          {formattedLines.map((line, index) => {
            const isHighlighted = currentTime >= line.startTime && currentTime < line.endTime;
            const remainingSeconds = Math.ceil(line.endTime - currentTime);
            return (
              <span key={index} className="pr-line">
                <span className={`pr-line-text ${isHighlighted ? 'pr-highlight' : ''}`}>
                  {line.text}
                </span>
                {isHighlighted && <span className="pr-seconds">{remainingSeconds}</span>}
              </span>
            );
          })}
        </div>
        <div className="pr-footer">
          <div className="pr-time-bar">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(estimatedDuration)} (예상시간)</span>
          </div>
          <div className="pr-progress-bar" ref={progressBarRef} onClick={handleProgressClick}>
            <div className="pr-progress" style={{ width: `${(currentTime / estimatedDuration) * 100}%` }}></div>
          </div>
          <div className="pr-controls">
            <button className="pr-control-button" onClick={handleReset}>
              <span className="pr-button-icon">⟲</span>
              <span className="pr-button-text">리셋</span>
            </button>
            <button className={`pr-play-button ${isPlaying ? 'pr-pause' : 'pr-play'}`} onClick={handlePlayClick}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button className="pr-control-button" onClick={() => navigate('/')}>
              <span className="pr-button-icon">≡</span>
              <span className="pr-button-text">목록</span>
            </button>
          </div>
        </div>
      </div>
      {showTutorial && (
        <div className="pr-tutorial-container">
          <TutorialPage onClose={toggleTutorial} />
        </div>
      )}
    </div>
  );
};

export default PracticeSpeechPage;