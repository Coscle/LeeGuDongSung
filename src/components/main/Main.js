import React, { useContext, useState, useEffect } from 'react';
import './main.css';
import '../../fonts/fonts.css';
import tpic from '../../images/tpic.png';
import { Link, useNavigate } from 'react-router-dom';
import instagramLogo from '../../images/instagram.png';
import facebookLogo from '../../images/facebook.png';
import  AuthContext  from '../../AuthContext.js'; // Import AuthContext

function Main() {
  const [mateText, setMateText] = useState("Travel\nMate");
  const [reviewText, setReviewText] = useState("Travel\nReview");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use AuthContext


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
	  if(login) {
		  navigate('/RecruitBoard');
	  }else{
		 navigate('/login'); 
	  }
  };

  const handleReviewClick = () => {
	  const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
	  if(login){
		  navigate('/ReviewBoard');
	  }else{
	    navigate('/login');
	  }
  };

  return (
    <>
      <div className="mainTop">
        <div className="mainLeft">
          <div className="mainText">마음이 <br /> <span className="highlight">Dong</span>하는 사람과 <br /> 함께 완<span className="highlight">Sung</span> 하는<br /> 취향 존중 여행</div>
          <div className='logo-container'>
	          <a href="https://www.instagram.com/29dongsung?igsh=bnpyZGQ0Ym8zc2I1" target="_blank" className="logo-link">
	            <img src={instagramLogo} className="logo" />
	          </a><a href="https://www.facebook.com/profile.php?id=61560642133003&mibextid=ZbWKwL" target="_blank" className="logo-link">
	            <img src={facebookLogo} className="logo" />
	          </a>
	       </div>
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