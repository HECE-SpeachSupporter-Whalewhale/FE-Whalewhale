import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function ViewMemoriesPage() {
  const navigate = useNavigate(); // 네비게이션 사용
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [filteredData, setFilteredData] = useState({
    titles: [],
    bodies: [],
    dates: [],
    bookmarks: []
  });

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 발표문 데이터를 가져옵니다.
  useEffect(() => {
    const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];

    const titles = savedSpeeches.map(speech => speech.title);
    const bodies = savedSpeeches.map(speech => speech.body);
    const dates = savedSpeeches.map(speech => new Date(speech.createdAt).toLocaleDateString());

    setFilteredData({
      titles,
      bodies,
      dates,
      bookmarks: [] // 즐겨찾기 기능이 있다면 여기에 추가
    });
  }, []);

  // 검색어에 따라 데이터를 필터링하는 함수
  const performSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();

    const combined = filteredData.titles.map((title, i) => ({
      title,
      body: filteredData.bodies[i],
      date: filteredData.dates[i],
    }));

    const filtered = combined.filter(item =>
      item.title.toLowerCase().includes(searchTermLower) ||
      item.body.toLowerCase().includes(searchTermLower)
    );

    setFilteredData({
      titles: filtered.map(item => item.title),
      bodies: filtered.map(item => item.body),
      dates: filtered.map(item => item.date),
      bookmarks: filteredData.bookmarks
    });
  };

  // 특정 발표문을 클릭하면 상세보기 페이지로 이동
  const handleViewDetailPage = (index) => {
    navigate('/ViewMemoriesPage_Detail', {
      state: {
        title: filteredData.titles[index],
        body: filteredData.bodies[index],
        created_at: filteredData.dates[index]
      }
    });
  };

  // 뒤로가기 버튼 클릭 시 홈 화면으로 이동
  const handleBack = () => {
    navigate('/'); // 홈 화면으로 돌아감
  };

  return (
    <div className='vi-ViewMemoriesPage'>
      <div className='vi-header'>
        {/* 뒤로가기 버튼 추가 */}
        <button className='vi-backbutton' onClick={handleBack}>
          
        </button>
        <div className='vi-Memory-title'>추억 살펴보기</div>
      </div>
      <div className='vi-main'>
        <div className='vi-search'>
          <input
            type='text'
            className='vi-search-input'
            placeholder='검색어를 입력하세요.'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') performSearch(); }}
          />
          <button className='vi-search-button' onClick={performSearch}>
            검색
          </button>
        </div>
        <div className='vi-content-div'>
          {filteredData.titles.map((title, index) => (
            <div key={index} className='vi-content' onClick={() => handleViewDetailPage(index)}>
              <div className='vi-title'>{title}</div>
              <div className='vi-content-text'>{filteredData.bodies[index]}</div>
              <div className='vi-date'>{filteredData.dates[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewMemoriesPage;
