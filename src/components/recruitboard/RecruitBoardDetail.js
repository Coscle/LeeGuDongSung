import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, redirect } from 'react-router-dom';
import './recruitBoardDetail.css';
import Comment from '../board/Comment';
import axios from 'axios';

const RecruitBoardDetail = () => {
  const { boardNo } = useParams();
  const [liked, setLiked] = useState(false); 
  const [likedCount, setLikedCount] = useState(0); 
  const [isScrapped, setIsScrapped] = useState(false);
  const [tags, setTags] = useState({})
  const [boardData, setBoardData] = useState([]);
  useEffect(()=>{
    axios.get("/findRecruitBoard/"+boardNo).then((res)=>{
      console.log(res.data);
      setBoardData(res.data);
    });
  },[]);
  useEffect(()=>{
    if (boardData.cboard_tags != null){
      setTags(JSON.parse(boardData.cboard_tags));
      console.log(boardData);
    }
  },[boardData]);
  const loggedInUserId = 1; // 임시아이디
  const navigate = useNavigate();

  const parseTags = (tagsString) => {
    if (typeof tagsString === 'string') {
      return tagsString.split(',').map(tag => tag.trim());
    } else if (Array.isArray(tagsString)) {
      return tagsString;
    } else {
      console.error('Invalid tags format:', tagsString);
      return [];
    }
  };

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

  const isOwner = loggedInUserId;

  return (
    <div className="detail-container">
      <header className="back-link-header">
        <Link to="/recruitboard" className="back-link">여행 메이트 구인 목록으로</Link>
      </header>
      <main className="detail-main">
        <section className="content">
          <div className="board-detail">
            <div className="board-info-container">
              <h2 className="board-title">
                {boardData?.board_title} | 작성일: {boardData?.board_writeday}
                <span className="recruitment-status">{boardData?.recruit_done ? '구인 완료' : '구인중'}</span>
              </h2>
              <div className="board-detail-item tag-list">
                {Array.isArray(tags) && tags.map((tag, index) => (
                  <>
                  <span key={index} className="tag" hidden={tag.지역?false:true}>{tag.지역}</span>
                  <span key={index} className="tag" hidden={tag.성별?false:true}>{tag.성별}</span>
                  <span key={index} className="tag" hidden={tag.타입?false:true}>{tag.타입}</span>
                  <span key={index} className="tag" hidden={tag.같이즐겨요?false:true}>{tag.같이즐겨요.map((toget,idx)=>( //
                    <span key={idx} className="tag">{toget}</span>
                  ))}</span>
                  </>
                ))}
              </div>
              <div className="board-detail-item date-info">
                <span className="date-info-label">여행 시작 날짜 : </span>
                <span className="date-info-value">{boardData?.trip_start}</span>
              </div>
              <div className="board-detail-item date-info">
                <span className="date-info-label">여행 종료 날짜 : </span>
                <span className="date-info-value">{boardData?.trip_end}</span>
              </div>
            </div>
            <div className="author-profile">
              <Link to={`/userProfile/${boardData?.author_no}`} className="author-profile-link">
                <img src={boardData?.MEMBER_PROFILE_PICTURE} alt="Profile" className="profile-picture" />
                {boardData?.member_nickname}
              </Link>
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
                <button className="scrap-button">스크랩</button>
              </div>
              {(
                <>
                <div className="right-buttons">
                  <button onClick={handleEdit} className="edit-button">수정</button>
                  <button onClick={handleDelete} className="delete-button">삭제</button>
                </div>
                </>
              )}
            </div>
          </div>
          <div className="comment-wrapper">
            <Comment comments={boardData?.comments || []} setComments={() => {}} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecruitBoardDetail;