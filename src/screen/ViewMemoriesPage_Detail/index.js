
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

function ViewMemoriesPage_Detail() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { title, body, created_at,index } = location.state || { title: 'No Title', body: 'No Body', created_at: 'No Date' };


  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const handleBack = () => {
    navigate('/view-memories'); // Use the exact path for ViewMemoriesPage
  };


  const handleNavigateToGeneration = () => {
    navigate('/generation', { state: { title: editedTitle, body: editedBody} });
  };

  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (index !== null) {
     
      
      navigate('/view-memories',{state: {deleteIndex:index}}); // 이동 후 페이지 새로고침
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
}

export default ViewMemoriesPage_Detail;

