import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './reviewBoardContent.css';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

const ReviewBoardContent = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
//  const [mergedData, setMergedData] = useState([]);

/*
  useEffect(() => {
    if (data && data.board && data.reviewboard) {
      console.log('Received data:', data);
      const combinedData = data.reviewboard.map(review => {
        const boardItem = data.board.find(board => board.board_no === review.board_no);
        return { ...review, ...boardItem };
      });
      console.log('Combined data:', combinedData);
      setMergedData(combinedData);
    } else {
      console.error('Data format is incorrect.');
    }
  }, [data]);
*/

  const handleEnterDetail = boardNo => {
    navigate(`/reviewboard/${boardNo}`);
  };
/*
  const uniqueData = mergedData.filter((value, index, self) => {
    return self.findIndex(item => item.vboard_no === value.vboard_no) === index;
  });

  const totalPages = Math.ceil(uniqueData.length / ITEMS_PER_PAGE);

  const currentData = uniqueData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
*/


 const [uniqueData, setUD] = useState([]);
   useEffect(()=>{
    axios.get("/getVboardAll").then((res)=>{
      setUD(res.data);
    })
  },[]);
  console.log(uniqueData);

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
            <div key={item.board_no} onClick={() => handleEnterDetail(item.board_no)} className="review-board-item">
              <h2>{item.board_title}</h2>
              <p>게시일: {item.board_writeday}</p>
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