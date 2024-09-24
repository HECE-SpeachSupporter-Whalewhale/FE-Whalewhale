
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
function ViewMemoriesPage_Detail() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
<<<<<<< Updated upstream
  const { title, body, created_at,index } = location.state || { title: 'No Title', body: 'No Content', created_at: 'No Date', index: null};
=======
  const { title, body, created_at,index } = location.state || { title: 'No Title', body: 'No Body', created_at: 'No Date' };
>>>>>>> Stashed changes


  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const handleBack = () => {
    navigate('/view-memories',{ state: { title: editedTitle, content: editedBody, index: index}}); // Use the exact path for ViewMemoriesPage
  };


  const handleNavigateToGeneration = () => {
<<<<<<< Updated upstream
    navigate('/generation', { state: { title: editedTitle, content: editedBody, index:index} });
=======
    navigate('/generation', { state: { title: editedTitle, body: editedBody} });
>>>>>>> Stashed changes
  };

  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

<<<<<<< Updated upstream
  const handleSave = async () => {
    if (index === undefined || index === null || index <= 0) {
      console.error('유효하지 않은 index입니다.');
      return;
    }
    console.log('Current index:', index);
=======
  const handleSave = () => {
    setIsEditing(false);
  };
>>>>>>> Stashed changes

    try {
      const presentationData = {
        title: editedTitle,
        body: editedBody,
        isBookmarked: true,
        usage: "business",
        speed: {
          speed_check: true,
          speed_minute: 2,
          speed_second: 30,
        },
      };
  
      const response = await axios.put(`/api/presentations/update/${index}`, presentationData);
      console.log('Presentation updated:', response.data);
      
      navigate('/view-memories', {
        state: { updatedTitle: editedTitle, updatedBody: editedBody, index }
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating presentation:', error);
    }
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
        
<<<<<<< Updated upstream
=======
        
        
        
>>>>>>> Stashed changes
      </div>
      
     
    </div>
  );
}

export default ViewMemoriesPage_Detail;

