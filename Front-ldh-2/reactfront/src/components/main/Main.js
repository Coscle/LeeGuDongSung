import React, { useState } from 'react';
import './main.css';
import '../../fonts/fonts.css';
import tpic from '../../images/tpic.png';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const [mateText, setMateText] = useState("Travel\nMate");
  const [reviewText, setReviewText] = useState("Travel\nReview");
  const navigate = useNavigate();

  const handleMouseEnterMate = () => {
    setMateText("여행\n메이트");
  };

  const handleMouseLeaveMate = () => {
    setMateText("Travel\nMate");
  };

  const handleMouseEnterReview = () => {
    setReviewText("여행\n리뷰");
  };

  const handleMouseLeaveReview = () => {
    setReviewText("Travel\nReview");
  };

  const handleMateClick = () => {
    navigate('/RecruitBoard');
  };

  const handleReviewClick = () => {
    navigate('/ReviewBoard');
  };

  return (
    <>
      <div className="mainTop">
        <div className="mainLeft">
          <div className="mainText">마음이 <br /> <span className="highlight">Dong</span>하는 사람과 <br /> 함께 완<span className="highlight">Sung</span> 하는<br /> 취향 존중 여행</div>
          <Link to="/login" className="joinButton">Join-us</Link>
        </div>
        
        <div className="buttonsContainer">
          <button 
            className="button travelMate" 
            onMouseEnter={handleMouseEnterMate} 
            onMouseLeave={handleMouseLeaveMate}
            onClick={handleMateClick}
          >
            {mateText}
          </button>
          <button 
            className="button travelReview" 
            onMouseEnter={handleMouseEnterReview} 
            onMouseLeave={handleMouseLeaveReview}
            onClick={handleReviewClick}
          >
            {reviewText}
          </button>
        </div>
      </div>
      <div className="bottom-container">
        <div className="image-container">
          <img className="tpic" src={tpic} alt="tpic" />
        </div>
        <div className="bottom-text-container">
          <div>29DongSung과 함께</div>
          <div>취향 존중 여행 메이트 찾으러 슈슝!</div>
        </div>
      </div>
    </>
  );
}

export default Main;