import React, { useState, useEffect } from 'react';
import BoardModify from '../board/BoardModify';
import SideFilter from '../board/SideFilter';
import { useNavigate } from 'react-router-dom';
import './recruitBoardModify.css';

const RecruitBoardModify = () => {
  const [initialValues, setInitialValues] = useState({}); // 초기 값으로 빈 객체를 설정
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardNo = 123; 
        const response = await fetch(`API_ENDPOINT/${boardNo}`); 
        if (response.ok) {
          const data = await response.json();
          setInitialValues(data); 
        } else {
          throw new Error('Failed to fetch board data');
        }
      } catch (error) {
        console.error('Error fetching board data:', error);
        // 오류 처리를 여기에 추가할 수 있습니다.
      }
    };

    fetchBoardData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (formData) => {
    console.log('Modified form data:', formData);
    // 여기에서 수정된 내용을 서버로 전송하거나 다른 작업을 수행
    navigate('/recruitboard'); 
  };

  return (
    <div className="modify-board-container">
      <div className="side-filter">
        <SideFilter showTopSearch={false} />
      </div>
      <div className="board-write-container">
     	 <h1>여행 메이트 찾기</h1>
        <BoardModify initialValues={initialValues} onSubmit={handleSubmit} isModify={true} />
      </div>
    </div>
  );
};

export default RecruitBoardModify;