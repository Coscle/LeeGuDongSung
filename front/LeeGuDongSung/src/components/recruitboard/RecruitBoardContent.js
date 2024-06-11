import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './recruitBoardContent.css';
import tempData from './tempData';

const ITEMS_PER_PAGE = 10; // 페이지당 아이템 수

const RecruitBoardContent = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleEnterDetail = boardNo => {
    navigate(`/recruitboard/${boardNo}`);
  };

  const uniqueData = tempData.filter((value, index, self) => {
    return self.findIndex(item => item.CBOARD_NO === value.CBOARD_NO) === index;
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
      <div className="recruit-board-container">
        <div className="recruit-board-items">
          {currentData.map(item => (
            <div key={item.CBOARD_NO} onClick={() => handleEnterDetail(item.CBOARD_NO)} className="recruit-board-item">
              <h2>{item.BOARD_TITLE}</h2>
              <p>게시 여부: {item.RECRUIT_DONE ? '구인중' : '구인완료'}</p>
              <p>게시일: {item.BOARD_WRITEDAY}</p>
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

export default RecruitBoardContent;