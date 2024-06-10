import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardWrite from '../board/BoardWrite';
import SideFilter from '../board/SideFilter';
import './recruitBoardWrite.css';

function RecruitBoardWrite() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // 폼 데이터 처리 (예: 서버로 전송)
    console.log('Form data:', formData);

    // 데이터 저장 후 목록 페이지로 이동
    navigate('/recruitboard');
  };

  return (
    <div className="write-board-container">
      <div className="side-filter">
        <SideFilter showTopSearch={false} />
      </div>
      <div className="board-write-container">
        <BoardWrite onSubmit={handleSubmit} onCancel={() => navigate('/recruitboard')} />
      </div>
    </div>
  );
}

export default RecruitBoardWrite;