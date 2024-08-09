import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

const PracticeSpeechPage = () => {
  const location = useLocation();
  const { title, content, estimatedDuration } = location.state || {};
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedContent, setHighlightedContent] = useState('');
  const [formattedLines, setFormattedLines] = useState([]);
  const speechContentRef = useRef(null);
  const progressBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lines = formatContent(content, estimatedDuration);
    setFormattedLines(lines);
  }, [content, estimatedDuration]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= estimatedDuration) {
            clearInterval(timer);
            setIsPlaying(false);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, estimatedDuration]);

  useEffect(() => {
    if (isPlaying) {
      const highlightedLines = formattedLines.map((line, index) => {
        const isHighlighted = currentTime >= line.startTime && currentTime < line.endTime;
        const remainingSeconds = Math.ceil(line.endTime - currentTime);
        return `<span class="pr-line ${isHighlighted ? 'pr-highlight' : ''}">
                  ${line.text}
                  ${isHighlighted ? `<span class="pr-seconds">${remainingSeconds}</span>` : ''}
                </span>`;
      });
      setHighlightedContent(highlightedLines.join('<br>'));

      const highlightedElement = speechContentRef.current.querySelector('.pr-highlight');
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightedContent(formattedLines.map((line) => `<span class="pr-line">${line.text}</span>`).join('<br>'));
    }
  }, [formattedLines, currentTime, isPlaying]);

  const formatContent = (content, duration) => {
    const lines = content.split('\n').map((line) => line.trim());
    const formattedLines = [];
    let startTime = 0;

    const totalWords = lines.reduce((count, line) => count + line.split(/\s+/).filter((word) => word !== '').length, 0);
    const timePerWord = duration / totalWords;

    for (let i = 0; i < lines.length; i++) {
      const words = lines[i].split(/\s+/).filter((word) => word !== '');
      let currentLine = '';

      for (let j = 0; j < words.length; j++) {
        if (currentLine.length + words[j].length + 1 <= 40) {
          currentLine += (currentLine ? ' ' : '') + words[j];
        } else {
          const endTime = startTime + currentLine.split(/\s+/).length * timePerWord;
          formattedLines.push({
            text: currentLine,
            startTime: startTime,
            endTime: endTime,
          });
          startTime = endTime;
          currentLine = words[j];
        }
      }

      if (currentLine) {
        const endTime = startTime + currentLine.split(/\s+/).length * timePerWord;
        formattedLines.push({
          text: currentLine,
          startTime: startTime,
          endTime: endTime,
        });
        startTime = endTime;
      }
    }

    return formattedLines;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (event) => {
    const progressBar = progressBarRef.current;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentage = clickPosition / progressBarWidth;
    const newTime = Math.floor(percentage * estimatedDuration);
    setCurrentTime(newTime);
  };

  const handlePlayClick = () => {
    if (currentTime >= estimatedDuration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="pr-play-icon">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );

  const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="pr-play-icon">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  );

  return (
    <div className="pr-practice-speech-page">
      <div className="pr-header">
        <span className="pr-back-button" onClick={() => navigate('/')}>
          &#8592;
        </span>
        <span className="pr-header-title">{title}</span>
      </div>
      <div className="pr-speech-content" ref={speechContentRef} dangerouslySetInnerHTML={{ __html: highlightedContent }}></div>
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
          <button className="pr-control-button" onClick={() => { setCurrentTime(0); setIsPlaying(false); }}>
            <span className="pr-button-icon">⏮</span>
            <span className="pr-button-text">리셋</span>
          </button>
          <button className={`pr-play-button ${isPlaying ? 'pr-pause' : 'pr-play'}`} onClick={handlePlayClick}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="pr-control-button" onClick={() => navigate('/')}>
            <span className="pr-button-icon">≡</span>
            <span className="pr-button-text">목록</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeSpeechPage;