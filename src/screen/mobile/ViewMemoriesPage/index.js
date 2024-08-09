import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

function ViewSpeechPage() {
  const navigate = useNavigate();

  // 상태 설정  
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [bookmark, setBookmark] = useState([]); // 즐겨찾기 버튼

  // 버튼 리스트 항목
  const buttons = ['최신순', '이름순', '검색어 관련순', '즐겨찾기순'];  

  const [titles, setTitle] = useState([
    '편집 디자인 발표',
    '디자인 원리',
    'UI/UX 발표',
    '그래픽 디자인',
    '브랜드 디자인',
    '제품 디자인 발표'
  ]);
  const [contents, setContent] = useState([
    '안녕하세요, 편집디자인 설계 기말과제를 발표할 19학번 이민우라고 합니다.',
    '안녕하세요, 디자인 원리를 발표할 19학번 김철수입니다.',
    '안녕하세요, UI/UX를 발표할 19학번 박영희입니다.',
    '안녕하세요, 그래픽 디자인을 발표할 19학번 이준호입니다.',
    '안녕하세요, 브랜드 디자인을 발표할 19학번 최지우입니다.',
    '안녕하세요, 제품 디자인을 발표할 19학번 이수빈입니다.'
  ]);
  const [dates, setDate] = useState([
    '2024.04.15',
    '2024.04.16',
    '2024.04.17',
    '2024.04.18',
    '2024.04.19',
    '2024.04.20'
  ]);

  // 버튼 리스트 토글 함수
  const toggleList = () => {
    setIsListVisible(prevState => !prevState);
  };  
  
  const handleButtonClick = (index) => {
    setSelectedButton(index);

    // 정렬 로직
    const combined = titles.map((title, i) => ({
        title,
        content: contents[i],
        date: dates[i],
        isBookmarked: bookmark.includes(i)
    }));

    // 즐겨찾기순 정렬 처리
    if (index === 3) {
        combined.sort((a, b) => {
            if (a.isBookmarked && !b.isBookmarked) return -1; // a가 즐겨찾기, b가 아닌 경우
            if (!a.isBookmarked && b.isBookmarked) return 1; // b가 즐겨찾기, a가 아닌 경우
            return new Date(b.date) - new Date(a.date); // 즐겨찾기가 아닌 경우 최신순 정렬
        });
    } else {
        // 일반 정렬 처리
        if (index === 0) {
            // 최신순
            combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (index === 1) {
            // 이름순
            combined.sort((a, b) => a.title.localeCompare(b.title));
        } else if (index === 2) {
            // 검색어 관련순
            combined.sort((a, b) => new Date(b.date) - new Date(a.date)); // 현재 로직이 동일하므로 최신순 사용
        }
    }

    // 정렬된 데이터로 상태 업데이트
    setTitle(combined.map(item => item.title));
    setContent(combined.map(item => item.content));
    setDate(combined.map(item => item.date));
    
    // 즐겨찾기 상태 업데이트
    const newBookmarks = combined
      .filter(item => item.isBookmarked)
      .map((_, i) => i); // 즐겨찾기 인덱스 업데이트
    setBookmark(newBookmarks);
};

  const handleBack = () => {
    navigate('/');
  };

  const toggleBookmark = (index) => { // 즐겨찾기
    setBookmark((prevBookmarks) => {
      if (prevBookmarks.includes(index)) {
        return prevBookmarks.filter((i) => i !== index);
      } else {
        return [...prevBookmarks, index];
      }
    });
  };

  return (
    <div className='vi-view-memories-page'>
      <div className="vi-header">
        <div className="vi-header-div">
          <button className="vi-back-button" onClick={handleBack}>
            <svg width="20" height="20" viewBox="-2 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="black"/>
            </svg>
          </button>
          <span className="vi-memory-view">추억 살펴보기</span>
        </div>
      </div>
      <div className='vi-main'>
        <div className='vi-main-1'>
          <div className='vi-search'>
            <input type='text' className='vi-search-input' placeholder='검색어를 입력하세요.' />
            <button className='vi-search-button'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.37903 10.2327C8.54335 10.8604 7.50457 11.2324 6.37891 11.2324C3.61748 11.2324 1.37891 8.99385 1.37891 6.23242C1.37891 3.471 3.61748 1.23242 6.37891 1.23242C9.14033 1.23242 11.3789 3.471 11.3789 6.23242C11.3789 7.50778 10.9014 8.67161 10.1154 9.5549L10.0859 9.52539L9.37883 10.2325L9.37903 10.2327ZM10.0921 10.9457C9.07062 11.7515 7.78092 12.2324 6.37891 12.2324C3.0652 12.2324 0.378906 9.54613 0.378906 6.23242C0.378906 2.91871 3.0652 0.232422 6.37891 0.232422C9.69261 0.232422 12.3789 2.91871 12.3789 6.23242C12.3789 7.78394 11.79 9.19791 10.8236 10.263L13.6215 13.0609L12.9144 13.768L10.0921 10.9457Z" fill="#D9D9D9"/>
              </svg>
            </button>
          </div>
          <div className='vi-list-button'>
            <button className='vi-sort-button' onClick={toggleList}>
              <div className='vi-sort-icon'>
                <div className='vi-line1'></div>
                <div className='vi-line2'></div>
                <div className='vi-line3'></div>
              </div>
            </button>
            <span className='vi-sort-label'>정렬순</span>
          </div>
          {isListVisible && (
            <div className='vi-button-list'>
              {buttons.map((buttonLabel, index) => (
                <button
                  key={index}
                  className={`vi-button-item ${selectedButton === index ? 'selected' : ''}`}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonLabel}
                  <span className='vi-check-icon'>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.33333L5.8 8L13 1" stroke="#3A9BD9"/>
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
    
        <div className='vi-main2'>
          {titles.map((title, index) => (
            <div key={index} className='vi-content'>
              <div className="vi-title">{title}
                <div className="Bookmark" onClick={() => toggleBookmark(index)}>
                  {bookmark.includes(index) ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#FFD700"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="#D9D9D9" fill="none"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="vi-content-text">{contents[index]}</div>
              <div className="vi-date">{dates[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewSpeechPage;
