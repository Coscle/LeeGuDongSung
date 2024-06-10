import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './reviewBoardDetail.css';
import reviewData from './tempData2.json';
import Comment from '../board/Comment';

const ReviewBoardDetail = () => {
  const { boardNo } = useParams();
  const [liked, setLiked] = useState(false); 
  const [likedCount, setLikedCount] = useState(0); 
  const boardData = reviewData.find(data => data.VBOARD_NO === boardNo);
  const loggedInUserId = "user123"; // 임시아이디
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/reviewboard/${boardNo}/modify`);
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const toggleLike = () => {
    setLiked(!liked); 
    setLikedCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
  };

  const isOwner = loggedInUserId === boardData?.MEMBER_NICKNAME;

  return (
    <div className="detail-container">
      <header className="header">
        <Link to="/reviewboard" className="back-link">리뷰 목록으로</Link>
      </header>
      <main className="detail-main">
        <section className="content">
          <div className="board-detail">
            <div className="board-info-container">
              <h2 className="board-title">
                {boardData?.BOARD_TITLE}
              </h2>
              <div className="board-detail-item date-info">
                <span className="date-info-label">작성일 : </span>
                <span className="date-info-value">{boardData?.BOARD_WRITEDAY}</span>
              </div>
            </div>
            <div className="author-profile">
              <span className="author-profile-label">작성자: </span>
              <span className="author-profile-value">{boardData?.MEMBER_NICKNAME}</span>
            </div>
            <div className="board-content">{boardData?.BOARD_CONTENT}</div>
            <div className="button-container">
              <div className="left-buttons">
                <button className="like-button" onClick={toggleLike}>
                  {liked ? '❤': '🤍'} {likedCount}
                </button>
                <button className="scrap-button">스크랩</button>
              </div>
              {isOwner && (
                <div className="right-buttons">
                  <button onClick={handleEdit} className="edit-button">수정</button>
                  <button onClick={handleDelete} className="delete-button">삭제</button>
                </div>
              )}
            </div>
          </div>
          <div className="comment-wrapper">
            <Comment comments={boardData?.BOARD_REPL} setComments={() => {}} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReviewBoardDetail