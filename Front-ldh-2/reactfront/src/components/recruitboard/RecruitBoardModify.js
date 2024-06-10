import React, { useState, useEffect } from 'react';
import BoardWrite from '../board/BoardWrite';
import SideFilter from '../board/SideFilter';
import { useNavigate } from 'react-router-dom';
import './recruitBoardModify.css';

const RecruitBoardModify = () => {
  const [initialValues, setInitialValues] = useState({}); // 초기 값으로 빈 객체를 설정
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardNo = 123; // 수정할 게시물의 번호 (임시로 설정)
        const response = await fetch(`API_ENDPOINT/${boardNo}`); // API_ENDPOINT를 실제 API 엔드포인트로 대체해야 합니다.
        if (response.ok) {
          const data = await response.json();
          setInitialValues(data); // 가져온 데이터를 상태에 설정합니다.
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
    // 여기에서 수정된 내용을 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
    navigate('/recruitboard'); 
  };

  return (
    <div className="modify-board-container">
      <div className="side-filter">
        <SideFilter showTopSearch={false} />
      </div>
      <div className="board-write-container">
     	 <h1>여행 메이트 찾기</h1>
        <BoardWrite initialValues={initialValues} onSubmit={handleSubmit} isModify={true} />
      </div>
    </div>
  );
};

export default RecruitBoardModify;