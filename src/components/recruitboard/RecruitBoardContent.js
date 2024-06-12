import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './recruitBoardContent.css';
import axios from 'axios';

const ITEMS_PER_PAGE = 10; // 페이지당 아이템 수

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const RecruitBoardContent = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleEnterDetail = boardNo => {
    navigate(`/recruitboard/${boardNo}`);
  };

  const [uniqueData, setUD] = useState([]);
  
  useEffect(()=>{
    axios.get("/getCboardAll").then((res)=>{
      setUD(res.data);
    })
  },[]);

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
            <div key={item.board_no} onClick={() => handleEnterDetail(item.board_no)} className="recruit-board-item">
              <h2>{item.board_title}</h2>
              <span className="isdonecheck">{item.recruit_done ? '구인완료' : '구인중'}</span>
              <p>{formatDate(item.board_writeday)}</p>
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