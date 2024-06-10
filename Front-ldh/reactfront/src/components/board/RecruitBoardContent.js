import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './recruitBoardContent.css'; // CSS 파일 import

const RecruitBoardContent = () => {
  // 임시로 사용할 여행 동행 아이템 리스트
  const itemList = [
    { boardNo: 1, boardTitle: '여행 동행 게시물 1', isPost: true, boardWriteday: '2024' },
    { boardNo: 2, boardTitle: '여행 동행 게시물 2', isPost: false, boardWriteday: '2024' },
    { boardNo: 3, boardTitle: '여행 동행 게시물 3', isPost: true, boardWriteday: '2024' },
    { boardNo: 4, boardTitle: '여행 동행 게시물 4', isPost: true, boardWriteday: '2024' },
    { boardNo: 5, boardTitle: '여행 동행 게시물 5', isPost: true, boardWriteday: '2024' },
  ];

  // 여행 동행 게시물의 상세 페이지로 이동하는 함수
  const handleEnterDetail = boardNo => {
    console.log(`Navigating to detail page of board ${boardNo}`);
  };

  return (
    <InfiniteScroll
      dataLength={itemList.length}
      next={() => {}} // 데이터를 더 불러오는 함수 (임시로 비워둠)
      hasMore={false} // 더 불러올 데이터가 있는지 여부 (임시로 false로 설정)
      loader={<h4>Loading...</h4>} // 로딩 중일 때 표시될 내용
      style={{ display: 'flex', flexWrap: 'wrap' }} 
    >
      {itemList.map(item => (
        <div key={item.boardNo} onClick={() => handleEnterDetail(item.boardNo)} className="recruit-board-item">
          <h2>{item.boardTitle}</h2>
          <p>게시 여부: {item.isPost ? '구인중' : '구인완료'}</p>
          <p>게시일: {item.boardWriteday}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default RecruitBoardContent;