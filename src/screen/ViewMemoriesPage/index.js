import React, { useState , useEffect} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import './style.css'; 

function ViewMemoriesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 상태 설정  
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [is_bookmarked, setBookmark] = useState([]); // 즐겨찾기 버튼
  const [searchTerm, setSearchTerm] = useState('');
  // 버튼 리스트 항목
  const buttons = ['최신순', '이름순', '검색어 관련순', '즐겨찾기순'];  

  const [title, setTitle] = useState([
    '편집 디자인 발표',
    '디자인 원리',
    'UI/UX 발표',
    '그래픽 디자인',
    '브랜드 디자인',
    '제품 디자인 발표',
    '자료구조 발표',
    '프로젝트 발표1'
  ]);
  const [body, setbody] = useState([
    '안녕하세요, 편집디자인 설계 기말과제를 발표할 19학번 이민우입니다.오늘 저는 이번 학기 동안 진행한 편집디자인 설계 프로젝트에 대해 말씀드리고자 합니다. 이 프로젝트는 저에게 창의성과 기술적 역량을 발휘할 수 있는 소중한 기회가 되었습니다. 먼저, 프로젝트의 주제를 설명드리겠습니다. 저는 주제를 선택하였으며, 이를 통해 독창적인 편집 디자인을 표현하고자 했습니다. 이 주제는 저에게 깊은 영감을 주었고, 독자들에게도 시각적이고 감성적인 경험을 제공하기에 적합하다고 판단했습니다. 프로젝트의 주요 과정으로는 아이디어 구상, 레이아웃 설계, 시각적 요소 선택 및 배치, 타이포그래피 구성이 있었습니다. 이를 통해 목표했던 디자인 목표와 컨셉을 구현하기 위해 다양한 시도를 했습니다.이제 각 단계별로 구체적인 설명을 드리겠습니다.아이디어 구상 이 단계에서는 아이디어 출처에서 영감을 받아 주제를 구체화하였습니다.레이아웃 설계 레이아웃을 채택해 독자들이 시각적으로 편안하게 내용을 받아들일 수 있도록 했습니다.시각적 요소 선택 및 배치 색상, 이미지, 그래픽은 주제와 일관되게 선택하여 시각적 통일성을 강조했습니다.타이포그래피 구성 텍스트는 폰트를 사용하여 가독성과 미적 요소를 동시에 고려했습니다.마지막으로, 이번 프로젝트를 통해 배운 점과 느낀 점을 말씀드리며 발표를 마치겠습니다. 프로젝트를 통해 배운 점을 깨닫게 되었고, 앞으로도 창의적 사고와 기술적 역량을 더욱 발전시킬 계획입니다.감사합니다.',
    '안녕하세요, 디자인 원리 발표를 맡은 19학번 김철수입니다. 오늘 저는 디자인 원리의 중요성과 이를 실제 작업에 어떻게 적용할 수 있는지에 대해 말씀드리겠습니다. 우선, 디자인 원리는 단순한 미적 요소를 넘어서서 사용자 경험을 개선하고, 커뮤니케이션을 명확하게 하며, 브랜드 메시지를 효과적으로 전달하는 데 핵심적인 역할을 합니다. 디자인에서 자주 언급되는 기본 원리로는 균형, 비례, 대비, 조화, 그리고 리듬이 있습니다. 이러한 원리들은 우리가 시각적으로 더 일관되고 매력적인 결과물을 만들 수 있도록 도와줍니다. 먼저 균형에 대해 이야기해보겠습니다. 균형은 디자인 내에서 요소들이 시각적으로 안정감을 주는 배치를 의미합니다. 대칭적 균형과 비대칭적 균형이 있으며, 각각이 주는 느낌은 다르지만 둘 다 잘 활용하면 효과적인 디자인을 만들 수 있습니다. 다음으로 비례는 각 요소들의 크기나 비율이 적절하게 배치되는 것을 뜻합니다. 비례는 요소 간의 관계를 명확하게 하고, 시각적인 조화와 리듬을 만들어 냅니다. 또한 대비는 디자인에서 중요한 원리 중 하나입니다. 대비를 통해 중요한 요소를 부각시킬 수 있으며, 색상, 크기, 모양 등을 사용하여 명확한 차이를 만들어냅니다. 조화는 디자인 요소들이 서로 잘 어우러지는 것을 의미합니다. 조화를 이루는 디자인은 통일감과 일관성을 주며, 보는 사람에게 안정감을 줍니다. 마지막으로 리듬은 디자인에서 반복과 패턴을 통해 시각적인 흐름을 만들어 내는 원리입니다. 리듬을 잘 활용하면 사용자로 하여금 자연스럽게 디자인을 따라가게 할 수 있습니다. 이처럼 디자인 원리는 시각적 아름다움과 기능성을 모두 갖춘 디자인을 만드는 데 중요한 역할을 합니다. 이제 이러한 원리를 실제 디자인 작업에서 어떻게 적용할 수 있는지 구체적인 예시와 함께 설명드리겠습니다. 감사합니다.',
    '안녕하세요, UI/UX를 발표할 19학번 박영희입니다. ',
    '안녕하세요, 그래픽 디자인 발표를 맡은 19학번 이준호입니다. 오늘 저는 그래픽 디자인의 기본 원리와 이 원리들이 실제 프로젝트에 어떻게 적용될 수 있는지에 대해 말씀드리고자 합니다. 그래픽 디자인은 시각적 커뮤니케이션의 핵심 도구로서, 브랜드의 메시지를 효과적으로 전달하고 사용자 경험을 향상시키는 역할을 합니다. 디자인에서 가장 중요한 원리로는 균형, 비례, 대비, 조화, 그리고 리듬을 들 수 있습니다. 먼저 균형은 디자인 요소들이 시각적으로 안정감을 주는 배치를 말하며, 대칭적 균형과 비대칭적 균형을 적절히 활용하면 디자인의 완성도를 높일 수 있습니다. 비례는 요소들 간의 크기나 배치가 조화롭게 연결되는 것을 의미하며, 비례를 잘 조절하면 디자인이 더 조화롭게 보입니다. 대비는 강조하고자 하는 부분을 부각시키는 방법으로, 색상이나 크기 등의 차이를 통해 디자인을 더 흥미롭게 만듭니다. 조화는 디자인의 일관성과 통일성을 유지하는 데 중요하며, 리듬은 반복적인 패턴을 통해 시각적인 흐름을 형성해 사용자의 시선을 자연스럽게 이끌어냅니다. 이처럼 그래픽 디자인의 기본 원리는 프로젝트에 적용되어 효과적인 커뮤니케이션을 돕고, 기능성과 아름다움을 겸비한 결과물을 만드는 기초가 됩니다. 이제 이 원리들이 어떻게 실제 프로젝트에서 구체적으로 활용될 수 있는지 사례를 통해 설명드리겠습니다.',
    '안녕하세요, 브랜드 디자인 발표를 맡은 19학번 최지우입니다. 오늘 저는 브랜드 디자인의 핵심 원리와 이를 어떻게 효과적으로 적용할 수 있는지에 대해 말씀드리겠습니다. 브랜드 디자인은 단순한 로고나 시각적 요소에 그치는 것이 아니라, 브랜드의 가치를 전달하고, 소비자와의 감정적 연결을 형성하는 중요한 역할을 합니다. 디자인을 통해 브랜드는 정체성을 확립하고, 경쟁 속에서 차별화될 수 있습니다. 브랜드 디자인의 중요한 요소로는 일관성, 독창성, 그리고 적절한 메시지 전달이 있습니다. 먼저, 일관성은 모든 시각적 요소가 하나의 통일된 메시지를 전달하도록 돕습니다. 로고, 색상, 타이포그래피 등이 조화를 이루어 브랜드의 정체성을 명확하게 표현할 수 있어야 합니다. 독창성은 브랜드가 눈에 띄고 기억에 남도록 만들어줍니다. 독특한 아이디어와 디자인으로 경쟁사와의 차별화를 꾀할 수 있습니다. 마지막으로, 메시지 전달은 디자인을 통해 소비자가 브랜드의 핵심 가치를 이해할 수 있도록 하는 것입니다. 시각적 요소는 브랜드의 비전과 미션을 직관적으로 전달하는 도구로써 중요한 역할을 합니다. 이처럼 브랜드 디자인은 기업의 성공에 큰 영향을 미치며, 이를 제대로 활용하면 강력한 브랜드 아이덴티티를 구축할 수 있습니다. 이제 실제 사례를 통해 이 원리들이 어떻게 적용되는지 살펴보도록 하겠습니다.',
    '안녕하세요, 제품 디자인을 발표할 19학번 이수빈입니다. 오늘 저는 제품 디자인의 과정과 그 중요성에 대해 말씀드리겠습니다. 제품 디자인은 단순히 물건을 아름답게 만드는 것을 넘어서, 사용자의 경험을 향상시키고, 제품의 기능성을 극대화하는 데 중점을 둡니다.',
    '안녕하세요, 저는 자료구조 발표를 맡은 21학번 000입니다. 오늘 저는 자료구조의 기본 개념과 이를 실제 프로그래밍에 어떻게 적용할 수 있는지에 대해 말씀드리겠습니다. 자료구조는 데이터를 효율적으로 저장하고 관리하기 위한 다양한 방법들을 의미하며, 이를 통해 프로그램의 성능을 크게 향상시킬 수 있습니다. 자료구조는 크게 배열, 연결 리스트, 스택, 큐, 트리, 그래프 등으로 나눌 수 있으며, 각 구조는 특정 상황에서 더 효율적인 방법으로 데이터를 처리할 수 있도록 설계되었습니다. 예를 들어, 배열은 고정된 크기의 연속된 메모리 공간을 사용하는 반면, 연결 리스트는 동적으로 크기를 조절할 수 있는 장점이 있습니다. 스택은 LIFO(Last In First Out) 구조로, 후입선출 방식의 데이터 처리에 유용하고, 큐는 FIFO(First In First Out) 구조로, 선입선출 방식의 데이터를 처리할 때 적합합니다. 트리와 그래프는 좀 더 복잡한 관계를 표현할 때 주로 사용되며, 이진 트리나 이진 탐색 트리와 같은 구조는 데이터 검색 속도를 최적화하는 데 유리합니다. 자료구조를 이해하고 적절히 활용하는 것은 프로그램의 효율성과 성능을 높이는 핵심 요소입니다. 이제 각 자료구조가 실제로 어떻게 적용되는지 사례를 통해 설명드리겠습니다.',
    '안녕하세요, 저는 프로젝트 발표를 맡은 21학번 000입니다.'
  ]);
  const [created_at, setDate] = useState([
    '2024.04.15',
    '2024.04.16',
    '2024.04.17',
    '2024.04.18',
    '2024.04.19',
    '2024.04.20',
    '2024.08.10',
    '2024.08.11'
  ]);

  const [filteredData, setFilteredData] = useState({
    titles: title,

    bodies: body,
    dates: created_at,
    bookmarks: is_bookmarked
  });

  const handleDelete = (index) => {
    const newTitles = filteredData.titles.filter((_, i) => i !== index);
    const newBodies = filteredData.bodies.filter((_, i) => i !== index);
    const newDates = filteredData.dates.filter((_, i) => i !== index);
    const newBookmarks = filteredData.bookmarks.filter((i) => i !== index);

    setFilteredData({
      titles: newTitles,
      bodies: newBodies,
      dates: newDates,
      bookmarks: newBookmarks
    });

    navigate('/view-memories');
  };


  useEffect(() => {
    if (location.state && location.state.deleteIndex !== undefined) {
      handleDelete(location.state.deleteIndex);
    }
  }, [location.state]);
  
  // 버튼 리스트 토글 함수
  const toggleList = () => {
    setIsListVisible(prevState => !prevState);
  };  
  
  const handleButtonClick = (index) => {
    setSelectedButton(index);

    // 정렬 로직
    const combined = title.map((title, i) => ({
        title,
        body: body[i],
        date: created_at[i],
        is_Bookmarked: is_bookmarked.includes(i)
    }));

    // 즐겨찾기순 정렬 처리
    if (index === 3) {
        combined.sort((a, b) => {
            if (a.is_Bookmarked && !b.is_Bookmarked) return -1; // a가 즐겨찾기, b가 아닌 경우
            if (!a.is_Bookmarked && b.is_Bookmarked) return 1; // b가 즐겨찾기, a가 아닌 경우
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
    setFilteredData({
      titles: combined.map(item => item.title),
      bodies: combined.map(item => item.body),
      dates: combined.map(item => item.date),
      bookmarks: combined.filter(item => item.is_Bookmarked).map((_, i) => i)
    });
};
    
   

  const handleBack = () => {
    navigate('/');
  };

  const toggleBookmark = (index) => {
    setBookmark((prevBookmarks) => {
      const newBookmarks = prevBookmarks.includes(index) 
        ? prevBookmarks.filter((i) => i !== index)
        : [...prevBookmarks, index];
      
      // Update filteredData with new bookmark state
      setFilteredData((prevData) => ({
        ...prevData,
        bookmarks: newBookmarks
      }));

      return newBookmarks;
    });
  };
  


const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

const performSearch = () => {
  const searchTermLower = searchTerm.toLowerCase();

  const combined = title.map((title, i) => ({
    title,
    body: body[i],
    date: created_at[i],
    is_bookmarked: is_bookmarked.includes(i),
    relevance: (title.toLowerCase().includes(searchTermLower) ? 
                (title.toLowerCase().indexOf(searchTermLower) + 1) : 0)
  }));

  const filtered = combined.filter(item =>
    item.title.toLowerCase().includes(searchTermLower) ||
    item.body.toLowerCase().includes(searchTermLower)
  );

  
  filtered.sort((a, b) => {
    if (b.relevance !== a.relevance) {
      return b.relevance - a.relevance;
    }
    return new Date(b.date) - new Date(a.date); 
  });

  setFilteredData({
    titles: filtered.map(item => item.title),
    bodies: filtered.map(item => item.body),
    dates: filtered.map(item => item.date),
    bookmarks: filtered
      .filter(item => item.is_bookmarked)
      .map((_, i) => i) 
  });
};


const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
};


const handleViewDetailPage = (index) => {
  navigate('/ViewMemoriesPage_Detail', {
    state: {
      title: filteredData.titles[index],
      body: filteredData.bodies[index],
      created_at: filteredData.dates[index],
      index: index
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
            <input type='text' 
            className='vi-search-input' 
            placeholder='검색어를 입력하세요.'  
            value={searchTerm}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}/>
            <button className='vi-search-button' onClick={performSearch}>
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
              {filteredData.titles.map((title, index) => (
                <div key={index} className='vi-content'>
                  <div className='vi-title-div'>
                    <div className="vi-title" onClick={() => handleViewDetailPage(index)}>
                     {title}
                    </div> 
                    <div className="vi-Bookmark" onClick={() => toggleBookmark(index)}>
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
                  <div className="vi-content-text" onClick={() => handleViewDetailPage(index)}>{filteredData.bodies[index]}</div>
                  <div className="vi-date" onClick={() => handleViewDetailPage(index)}>{filteredData.dates[index]}</div>
                </div>
              ))}
            </div>
      </div>
    </div>
  </div> 

  );
}

export default ViewMemoriesPage;
