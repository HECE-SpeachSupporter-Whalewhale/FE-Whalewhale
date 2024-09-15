import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

function ViewMemoriesPage_Detail() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { title, body, created_at } = location.state || { title: 'No Title', body: 'No Content', created_at: 'No Date' };


  const handleBack = () => {
    navigate('/view-memories'); // Use the exact path for ViewMemoriesPage
  };

  return (
    <div className='vi-ViewDetail'>
      <div className='vi-header'>
        <button className='vi-backbutton' onClick={handleBack}>
        </button>
        <div className='vi-Memory-title'>추억 살펴보기</div>
      </div>

      <div className='vi-detail'>
        <div className='vi-de-title'>  
          {title}
        </div>
        <div className='vi-de-content'>
        {body}
        </div>
        <div className='vi-de-content2'>
        <button className='vi-delete-button'>삭제</button>
        <div className='vi-created-at' >{created_at}</div>
        
        
        </div>
        
      </div>
      
     
    </div>
  );
}

export default ViewMemoriesPage_Detail;
