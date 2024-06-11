import React from 'react';
import SideFilter from '../board/SideFilter';
import RecruitBoardContent from './RecruitBoardContent';
import './recruitBoard.css';
import { Link } from 'react-router-dom';

function RecruitBoard() {
  const products = [
    { id: 1, name: 'Product 1', region: ['서유럽'], gender: '남자', type: '즉흥', budget: '더치페이', activities: ['카페'] },
    { id: 2, name: 'Product 2', region: ['북유럽'], gender: '여자', type: '계획', budget: '공금', activities: ['산책'] },
  ];

  return (
    <div className="recruit-board-container">
      <div className="side-filter">
        <SideFilter products={products} showTopSearch={true} />
      </div>
      <div className="recruit-link-content-container">
        <div className="recruit-link-container">
          <Link to="/reviewboard" className="go-to-review">메이트의 여행 후기</Link>
          <Link to="/recruitboardwrite" className="go-to-write">메이트 찾으러 가기</Link>
        </div>
        <div className="recruit-board-content">
          <RecruitBoardContent />
        </div>
      </div>
    </div>
  );
}

export default RecruitBoard;
