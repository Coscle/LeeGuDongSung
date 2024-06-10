import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reviewBoardContent.css';

const ITEMS_PER_PAGE = 10;

const ReviewBoardContent = ({ data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleEnterDetail = boardNo => {
    navigate(`/reviewboard/${boardNo}`);
  };

  // 데이터가 배열로 구성되어 있지 않다면 빈 배열로 초기화합니다.
  const dataArray = Array.isArray(data) ? data : [];

  const uniqueData = dataArray.filter((value, index, self) => {
    return self.findIndex(item => item.VBOARD_NO === value.VBOARD_NO) === index;
  });

  const totalPages = Math.ceil(uniqueData.length / ITEMS_PER_PAGE);

  const currentData = uniqueData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="review-board-container">
        <div className="review-board-items">
          {currentData.map(item => (
            <div key={item.VBOARD_NO} onClick={() => handleEnterDetail(item.VBOARD_NO)} className="review-board-item">
              <h2>{item.BOARD_TITLE}</h2>
              <p>게시일: {item.BOARD_WRITEDAY}</p>
              <img src={item.PHOTO_URL} alt="사진" /> 
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-button"
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-button"
        >
          다음
        </button>
      </div>
    </>
  );
};

export default ReviewBoardContent;