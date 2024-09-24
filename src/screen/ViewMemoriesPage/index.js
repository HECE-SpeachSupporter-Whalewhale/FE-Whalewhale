import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const ViewMemoriesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState({
    titles: [],
    bodies: [],
    dates: [],
    bookmarks: []
  });

  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const buttons = ['날짜순', '이름순', '즐겨찾기'];

  useEffect(() => {
    const loadMemories = () => {
      const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];
      const titles = savedSpeeches.map(speech => speech.title);
      const bodies = savedSpeeches.map(speech => speech.body);
      const dates = savedSpeeches.map(speech => new Date(speech.createdAt).toLocaleDateString());
  
      setFilteredData({
        titles,
        bodies,
        dates,
        bookmarks: []
      });
    };
  
    loadMemories();
  
    // Check if a memory was edited or deleted in the detail page
    if (location.state?.title && location.state?.body) {
      const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];
      
      // Update the edited memory in localStorage if an index is passed
      if (location.state.index !== undefined) {
        savedSpeeches[location.state.index] = {
          title: location.state.title,
          body: location.state.body,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('speeches', JSON.stringify(savedSpeeches));
        loadMemories(); // Refresh the list after updating
      }
    }
  
    // If a memory was deleted, handle deletion
    const deleteIndex = location.state?.deleteIndex;
    if (deleteIndex !== undefined) {
      const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];
      savedSpeeches.splice(deleteIndex, 1); // Remove the memory
      localStorage.setItem('speeches', JSON.stringify(savedSpeeches)); // Update local storage
      loadMemories(); // Reload memories after deletion
    }
  
  }, [location.state]); // Re-run effect when location.state changes
  

  const toggleBookmark = (index) => {
    setFilteredData(prevData => {
      const updatedBookmarks = prevData.bookmarks.includes(index)
        ? prevData.bookmarks.filter(i => i !== index)
        : [...prevData.bookmarks, index];

      return {
        ...prevData,
        bookmarks: updatedBookmarks
      };
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const combined = filteredData.titles.map((title, i) => ({
      title,
      body: filteredData.bodies[i],
      date: filteredData.dates[i],
      isBookmarked: filteredData.bookmarks.includes(i)
    }));

    const filtered = combined.filter(item =>
      item.title.toLowerCase().includes(searchTermLower) ||
      item.body.toLowerCase().includes(searchTermLower)
    );

    setFilteredData({
      titles: filtered.map(item => item.title),
      bodies: filtered.map(item => item.body),
      dates: filtered.map(item => item.date),
      bookmarks: filtered
        .filter(item => item.isBookmarked)
        .map((_, i) => i)
    });
  };

  const toggleList = () => {
    setIsListVisible(!isListVisible);
  };

  const handleButtonClick = (index) => {
    setSelectedButton(index);
    handleSort(buttons[index].toLowerCase());
  };

  const handleSort = (type) => {
    const combined = filteredData.titles.map((title, i) => ({
      title,
      body: filteredData.bodies[i],
      date: filteredData.dates[i],
      isBookmarked: filteredData.bookmarks.includes(i)
    }));

    if (type === '날짜순') {
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === '이름순') {
      combined.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === '즐겨찾기') {
      combined.sort((a, b) => {
        if (a.isBookmarked && !b.isBookmarked) return -1;
        if (!a.isBookmarked && b.isBookmarked) return 1;
        return new Date(b.date) - new Date(a.date);
      });
    }

    setFilteredData({
      titles: combined.map(item => item.title),
      bodies: combined.map(item => item.body),
      dates: combined.map(item => item.date),
      bookmarks: combined
        .filter(item => item.isBookmarked)
        .map((_, i) => i)
    });
  };

  const handleViewDetailPage = (index) => {
    navigate('/ViewMemoriesPage_Detail', {
      state: {
        title: filteredData.titles[index],
        body: filteredData.bodies[index],
        created_at: filteredData.dates[index],
        index // Pass the index for deletion
      }
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  
  return (
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
              <input 
                type='text' 
                className='vi-search-input' 
                placeholder='검색어를 입력하세요.'
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyPress}
              />
              <button 
                className='vi-search-button'
                onClick={performSearch}
              >
                <svg width="30" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.73043 10.1374C8.85669 10.8847 7.72225 11.3359 6.48242 11.3359C3.721 11.3359 1.48242 9.09736 1.48242 6.33594C1.48242 3.57451 3.721 1.33594 6.48242 1.33594C9.24385 1.33594 11.4824 3.57451 11.4824 6.33594C11.4824 7.71252 10.9261 8.95917 10.0261 9.86334C9.9566 9.8873 9.89136 9.927 9.8359 9.98246C9.78991 10.0284 9.75476 10.0812 9.73043 10.1374ZM10.1956 11.0493C9.17414 11.8551 7.88444 12.3359 6.48242 12.3359C3.16871 12.3359 0.482422 9.64965 0.482422 6.33594C0.482422 3.02223 3.16871 0.335938 6.48242 0.335938C9.79613 0.335938 12.4824 3.02223 12.4824 6.33594C12.4824 7.88745 11.8935 9.30142 10.9271 10.3665L13.3714 12.8109C13.5667 13.0061 13.5667 13.3227 13.3714 13.518C13.1762 13.7133 12.8596 13.7133 12.6643 13.518L10.1956 11.0493Z" fill="#8C8C8C"/>
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
            {filteredData.titles.map((title, index) => (
              <div key={index} className='vi-content' onClick={() => handleViewDetailPage(index)}>
                <div className="vi-title">
                  {title}
                  <div className="vi-Bookmark" onClick={(e) => {e.stopPropagation(); toggleBookmark(index);}}>
                    {filteredData.bookmarks.includes(index) ? (
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
                <div className="vi-content-text">{filteredData.bodies[index]}</div>
                <div className="vi-date">{filteredData.dates[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMemoriesPage;