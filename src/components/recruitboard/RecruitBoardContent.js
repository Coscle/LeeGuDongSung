import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './recruitBoardContent.css';
import axios from 'axios';

const ITEMS_PER_PAGE = 12; // 페이지당 아이템 수

const RecruitBoardContent = (filtering, setFilter) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleEnterDetail = boardNo => {
    navigate(`/recruitboard/${boardNo}`);
  };

  const [uniqueData, setUD] = useState([]);
  const [search, setSear] = useState(true);
  useEffect(()=>{
    axios.get("/getCboardAll").then((res)=>{
      setUD(res.data);
    })
    console.log(filtering);
  },[]);
  
  useEffect(() => {
    axios.get("/getCboardAll").then((res)=>{
      setUD(res.data);
      setSear(!search);
    })
  }, [filtering.filtering]);

  useEffect(() => {
    if (filtering.filtering.length > 0) {
        const filteredData = [...uniqueData.filter((item) => {
            // 필터링된 태그들 중 하나라도 해당 게시글의 태그에 포함되어 있으면 true 반환
            return filtering.filtering.every((filterTag) => item.cboard_tags.includes(filterTag));
        })];
        setUD(filteredData);
    }
  }, [search]);

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
              <h2 className="content-title">{item.board_title}</h2>
              <span className="contentwritenick">{item.member_nickname}님은</span>
              <span className="isdonecheck">{item.recruit_done ? '구인완료' : '구인중'}</span>
              <p>{item.board_writeday.slice(0,10)}</p>
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