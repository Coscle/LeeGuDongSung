import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './recruitBoardDetail.css';
import Comment from '../board/Comment';
import axios from 'axios';
import '../../fonts/fonts.css';

const RecruitBoardDetail = () => {
  const { boardNo } = useParams();
  const [liked, setLiked] = useState(false); 
  const [likedCount, setLikedCount] = useState(11); 
  const [isScrapped, setIsScrapped] = useState(false);
  const [tags, setTags] = useState({})
  const [boardData, setBoardData] = useState([]);

  useEffect(()=>{
    axios.get("/findRecruitBoard/"+boardNo).then((res)=>{
      setBoardData(res.data);
    });
  },[]);
  
  useEffect(()=>{
    if (boardData.cboard_tags != null){
      setTags(boardData.cboard_tags.split('/'));
    }
  },[boardData]);
  
  const loggedInUserId = "user123"; // 임시아이디
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/recruitboard/${boardNo}/modify`);
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
    axios.get("/deleteBoard/"+boardNo);
    navigate("/recruitBoard", ()=>{window.location.reload()});
  };

  const toggleLike = () => {
    setLiked(!liked); 
    setLikedCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
  };

  const toggleScrap = () => {
    setIsScrapped(prevScrapped => !prevScrapped);
  };

  const isOwner = loggedInUserId === boardData?.member_id;


  return (
    <>
    <header className="back-link-header">
          <Link to="/recruitboard" className="back-link">여행 메이트 구인 목록으로</Link>
      </header>
    <div className="detail-page-container">
      <div className="detail-container">
        <main className="detail-main">
          <section className="content">
            <div className="board-detail">
              <div className="board-info-container">
                <h2 className="board-title">
                  {boardData?.board_title}
                  <span className="recruitment-status">{boardData?.recruit_done ? '구인 완료' : '구인중'}</span>
                </h2>
                <div className="board-detail-item tag-list">
                  {Array.isArray(tags) && tags.map((tag, index) => (
                    <React.Fragment key={index}>
                      {tag && <span className="tag">{tag}</span>}
                    </React.Fragment>
                  ))}
                </div>
                <div className="author-profile">
                <Link to={`/userProfile/${boardData?.author_no}`} className="author-profile-link">
                  <img src={boardData?.MEMBER_PROFILE_PICTURE} alt="Profile" className="profile-picture" />
                  {boardData?.member_nickname}
                </Link>
              </div>
              <div className="board-detail-item date-info">
                <span className="date-info-value">여행 일정 | {boardData?.trip_start} ~ {boardData?.trip_end}</span>
              </div>
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
        <Comment comments={boardData?.comments || []} setComments={() => {}} />
      </div>
    </div>
    </>
  );
};

export default RecruitBoardDetail;