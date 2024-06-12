import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './reviewBoardDetail.css';
import reviewData from './tempData2.json';
import Comment from '../board/Comment';
import axios from 'axios';

const ReviewBoardDetail = () => {
  const { boardNo } = useParams();
  const [liked, setLiked] = useState(false); 
  const [likedCount, setLikedCount] = useState(0); 
  //const boardData = reviewData.find(data => data.board_no === boardNo);
  const [boardData, setBoardData] = useState([]);
  const loggedInUserId = "user123"; // 임시아이디
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("/findReviewBoard/"+boardNo).then((res)=>{
      setBoardData(res.data);
    });
  },[]);
  console.log(boardData);

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


  const isOwner = loggedInUserId === boardData?.member_nickname;

  return (
	<>
      <header className="back-link-header">
        <Link to="/reviewboard" className="back-link">리뷰 목록으로</Link>
      </header>
    <div className="detail-page-container">
    <div className="detail-container">
      <main className="detail-main">
        <section className="content">
          <div className="board-detail">
            <div className="board-info-container">
              <h2 className="board-title">
                {boardData?.board_title}
              </h2>
            </div>
           <div className="author-profile">
                <Link to={`/userProfile/${boardData?.author_no}`} className="author-profile-link">
                  <img src={boardData?.MEMBER_PROFILE_PICTURE} alt="Profile" className="profile-picture" />
                  {boardData?.member_nickname}
                </Link>
              </div>
            <div className="board-detail-item date-info">
                <span className="date-info-label">작성일 : </span>
                <span className="date-info-value">{boardData?.board_writeday}</span>
              </div>
             <div className="board-content">{boardData?.board_content}</div>
              {boardData?.photo && (
                <div className="board-photo-container">
                  <img src={boardData.photo} alt="Board" className="board-photo" />
                </div>
              )}
            <div className="button-container">
              <div className="left-buttons">
                <button className="like-button" onClick={toggleLike}>
                  {liked ? '❤': '🤍'} {likedCount}
                </button>
                <button className="scrap-button" onClick={toggleScrap}>
                    {isScrapped ? '스크랩 완료' : '스크랩'}
                  </button>
              </div>
              {(
                <div className="right-buttons">
                  <button onClick={handleEdit} className="edit-button">수정</button>
                  <button onClick={handleDelete} className="delete-button">삭제</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      </div>
      <div className="comment-wrapper">
        <Comment comments={boardData?.board_repl} setComments={() => {}} />
      </div>
    </div>
    </>
  );
};

export default ReviewBoardDetail;