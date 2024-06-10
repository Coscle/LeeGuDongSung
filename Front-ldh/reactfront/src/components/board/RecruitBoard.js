import React from 'react';
import SideFilter from './SideFilter';
import RecruitBoardContent from './RecruitBoardContent';
import './recruitBoard.css'; 

function RecruitBoard(){
  return (
    <div className="recruit-board-container">
      <div className="side-filter">
        <SideFilter />
      </div>
      <div className="recruit-board-content">
        <RecruitBoardContent />
      </div>
    </div>
  );
};

export default RecruitBoard;