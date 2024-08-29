import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

function ViewMemoriesPagePc() {
  const navigate = useNavigate();

  // 상태 설정  
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [bookmark, setBookmark] = useState([]); // 즐겨찾기 버튼
  const [searchTerm, setSearchTerm] = useState('');
  // 버튼 리스트 항목
  const buttons = ['최신순', '이름순', '검색어 관련순', '즐겨찾기순'];  

  const [titles, setTitle] = useState([
    '편집 디자인 발표',
    '디자인 원리',
    'UI/UX 발표',
    '그래픽 디자인',
    '브랜드 디자인',
    '제품 디자인 발표',
    '자료구조 발표',
    '프로젝트 발표1'
  ]);
  const [contents, setContent] = useState([
    '안녕하세요, 편집디자인 설계 기말과제를 발표할 19학번 이민우라고 합니다. \n 오늘 저는 이번 학기 동안 진행한 편집디자인 설계 프로젝트에 대해 말씀드리고자 합니다. 이 프로젝트는 저에게 창의성과 기술적 역량을 발휘할 수 있는 소중한 기회가 되었습니다. 먼저, 프로젝트의 주제를 설명드리겠습니다. ',
    '안녕하세요, 디자인 원리를 발표할 19학번 김철수입니다. 오늘 저는 디자인 원리의 중요성과 이를 실제 작업에 어떻게 적용할 수 있는지에 대해 말씀드리고자 합니다. ',
    '안녕하세요, UI/UX를 발표할 19학번 박영희입니다. ',
    '안녕하세요, 그래픽 디자인을 발표할 19학번 이준호입니다. 오늘 저는 그래픽 디자인의 기본 원리와 이 원리들이 실제 프로젝트에 어떻게 적용될 수 있는지에 대해 말씀드리고자 합니다. 그래픽 디자인은 시각적 커뮤니케이션의 핵심 도구로서, ',
    '안녕하세요, 브랜드 디자인을 발표할 19학번 최지우입니다.',
    '안녕하세요, 제품 디자인을 발표할 19학번 이수빈입니다. 오늘 저는 제품 디자인의 과정과 그 중요성에 대해 말씀드리겠습니다. 제품 디자인은 단순히 물건을 아름답게 만드는 것을 넘어서, 사용자의 경험을 향상시키고, 제품의 기능성을 극대화하는 데 중점을 둡니다.',
    '안녕하세요, 저는 자료구조 발표를 맡은 21학번 000입니다. 오늘',
    '안녕하세요, 저는 프로젝트 발표를 맡은 21학번 000입니다.'
  ]);
  const [dates, setDate] = useState([
    '2024.04.15',
    '2024.04.16',
    '2024.04.17',
    '2024.04.18',
    '2024.04.19',
    '2024.04.20',
    '2024.08.10',
    '2024.08.11'
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
  return(
    
  <div className='vi-ViewMemoriesPage'>
    <div className='vi-header'>
      <button className='vi-backbutton' onClick={handleBack}>
      </button>  
      <div className='vi-Memory-title'>추억 살펴보기</div>
    </div>


    <div className='vi-main'> 
      <div className='vi-main-div'>
        <div className='vi-search'>
          <div className='vi-search-div'>
            <input type='text' className='vi-search-input' placeholder='검색어를 입력하세요.'/>
            <button className='vi-search-button'>
              <svg  width="30" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.73043 10.1374C8.85669 10.8847 7.72225 11.3359 6.48242 11.3359C3.721 11.3359 1.48242 9.09736 1.48242 6.33594C1.48242 3.57451 3.721 1.33594 6.48242 1.33594C9.24385 1.33594 11.4824 3.57451 11.4824 6.33594C11.4824 7.71252 10.9261 8.95917 10.0261 9.86334C9.9566 9.8873 9.89136 9.927 9.8359 9.98246C9.78991 10.0284 9.75476 10.0812 9.73043 10.1374ZM10.1956 11.0493C9.17414 11.8551 7.88444 12.3359 6.48242 12.3359C3.16871 12.3359 0.482422 9.64965 0.482422 6.33594C0.482422 3.02223 3.16871 0.335938 6.48242 0.335938C9.79613 0.335938 12.4824 3.02223 12.4824 6.33594C12.4824 7.88745 11.8935 9.30142 10.9271 10.3665L13.3714 12.8109C13.5667 13.0061 13.5667 13.3227 13.3714 13.518C13.1762 13.7133 12.8596 13.7133 12.6643 13.518L10.1956 11.0493Z" fill="#8C8C8C"/>
              </svg>
            </button>
          </div>
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
      
        <div className='vi-content-div'>
        {titles.map((title, index) => (
            <div key={index} className='vi-content'>
              <div className="vi-title">
                {title}
                <div className="vi-Bookmark" onClick={() => toggleBookmark(index)}>
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
  </div> 

  );
}

export default ViewMemoriesPagePc;
