import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './reviewBoard.css';
import ReviewBoardContent from './ReviewBoardContent'; 
import tempData from './tempData2'; 


const ReviewBoard = () => {
  const navigate = useNavigate();

  const handleEnterWrite = boardCategory => {
    navigate(`/reviewboardwrite/${boardCategory}`);
  };
  return (
    <div className="review-board-container">
      <div className="review-link-content-container">
      <div className="findmymate">메이트의 여행 후기</div> 
        <div className="review-link-container">
          <Link to="/recruitboard" className="go-to-find">메이트 찾으러 가기</Link>
          <Link to="/reviewboardwrite" className="go-to-review">여행 후기 끄적이기</Link>
        </div>
        <div className="review-board-content">
          <ReviewBoardContent data={tempData} /> 
        </div>
      </div>
    </div>
  );
};

export default ReviewBoard;