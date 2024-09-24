import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

const ViewMemoriesPage_Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, body, created_at, index } = location.state || { title: 'No Title', body: 'No Body', created_at: 'No Date' };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  useEffect(() => {
    const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];
    if (index !== undefined && index < savedSpeeches.length) {
      setEditedTitle(savedSpeeches[index].title);
      setEditedBody(savedSpeeches[index].body);
    }
  }, [index]);

  const handleBack = () => {
    navigate('/view-memories');
  };

  const handleNavigateToGeneration = () => {
    navigate('/generation', { state: { title: editedTitle, body: editedBody } });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];

    if (index !== undefined) {
      savedSpeeches[index] = {
        title: editedTitle,
        body: editedBody,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('speeches', JSON.stringify(savedSpeeches));
    }

    navigate('/view-memories', { state: { title: editedTitle, body: editedBody, created_at: "2024.09.24" } });
  };

  const handleDelete = () => {
    const savedSpeeches = JSON.parse(localStorage.getItem('speeches')) || [];

    if (index !== undefined && index !== null) {
      savedSpeeches.splice(index, 1); // Remove the memory
      localStorage.setItem('speeches', JSON.stringify(savedSpeeches)); // Update local storage

      alert('삭제가 완료되었습니다.');
      navigate('/view-memories', { state: { deleteIndex: index } }); // Navigate with deleteIndex to refresh list
    }
  };

  

  
  return (
    <div className='vi-ViewDetail'>
      <div className='vi-header'>
        <button className='vi-backbutton' onClick={handleBack}>
        </button>
        <div className='vi-Memory-title'>추억 살펴보기</div>
      </div>

      <div className='vi-detail'>
        {isEditing ? (
          <> <div className='vi-detail'>
            <input 
              className='vi-de-title-input'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className='vi-de-content-input'
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            />
            </div>
          </>
        ) : (
          <>
            <div className='vi-de-title'>{editedTitle}</div>
            <div className='vi-de-content'>{editedBody}</div>
          </>
        )}
     
     <div className='vi-de-content2'>
          {isEditing ? (
            <button className='vi-save-button' onClick={handleSave}>저장</button>
          ) : (
            <>
              <button className='vi-edit-button' onClick={handleEditToggle}>수정하기</button>
              <button className='vi-practice-button' onClick={handleNavigateToGeneration}>발표하기</button>
              <button className='vi-delete-button'  onClick={handleDelete}>삭제</button>
            </>
          )}
        </div>
        <div className='vi-created-at' >{created_at}</div>
        
        
        
        
      </div>
      
     
    </div>
  );
};

export default ViewMemoriesPage_Detail;