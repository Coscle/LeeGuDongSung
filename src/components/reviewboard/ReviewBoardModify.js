import React, { useState, useEffect } from 'react';
import BoardWrite from '../board/BoardWrite';
import SideFilter from '../board/SideFilter';
import './reviewBoardModify.css'; 
import BoardModify from '../board/BoardModify';
import { useNavigate } from 'react-router-dom';

const ReviewBoardModify = () => {
  const [initialValues, setInitialValues] = useState({}); 
  const navigate = useNavigate();

  /*
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardNo = 123; 
        const response = await fetch(`API_ENDPOINT/${boardNo}`); // API_ENDPOINT를 실제 API 엔드포인트로 대체해야 
        if (response.ok) {
          const data = await response.json();
          setInitialValues(data); // 가져온 데이터를 상태에 설정
        } else {
          throw new Error('Failed to fetch board data');
        }
      } catch (error) {
        console.error('Error fetching board data:', error);
        // 오류 처리
      }
    };

    fetchBoardData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  const handleSubmit = (formData) => {
    console.log('Modified form data:', formData);
    // 여기에서 수정된 내용을 서버로 전송하거나 다른 작업을 수행
    navigate('/reviewboard', ()=>{window.location.reload()});
  };

  return (
    <div className="modify-board-container">
      <div className="side-filter">
        <SideFilter showTopSearch={false} />
      </div>
      <div className="board-write-container">
      	<h1>여행 후기 작성</h1>
        <BoardModify initialValues={initialValues} onSubmit={handleSubmit} category={2} />
      </div>
    </div>
  );
};

export default ReviewBoardModify;