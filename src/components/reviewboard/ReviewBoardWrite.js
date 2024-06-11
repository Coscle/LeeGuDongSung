import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardWrite from '../board/BoardWrite';
import './reviewBoardWrite.css';

function ReviewBoardWrite() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    console.log('Form data:', formData);


    navigate('/reviewboard');
  };

  return (
    <div className="write-board-container">
      <div className="board-write-container">
      	<h1>여행 후기 작성</h1>
        <BoardWrite onSubmit={handleSubmit} onCancel={() => navigate('/reviewboard')} />
      </div>
    </div>
  );
}

export default ReviewBoardWrite;