import React, { useState, useEffect, useContext } from 'react';
import { openDatabase, getUserData } from '../../db'; // 수정된 경로
import { useNavigate } from 'react-router';
import './profile.css';
import noprofile from '../../images/noprofile.png';
import insta from '../../images/instagram.png';
import leegudongsung from '../../images/leegudongsung.png'
import  AuthContext  from '../../AuthContext.js'; // Import AuthContext
import axios from 'axios';
const ITEMS_PER_PAGE = 10; // 페이지당 아이템 수

const MyProfile = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [heartClicked, setHeartClicked] = useState(false);
    const [email, setEmail] = useState(user.member_id); // 로그인한 사용자의 이메일을 세션에서 가져옴
    const [uniqueData, setUD] = useState([]);
    const [uniqueData2, setUD2] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [posts, setUser] = useState({   //setUser로 db의 데이터 불러와 user의 아래 값에 넣어 user.으로 호출
    nickname: '',
    posts: [
      { id: 1, title: 'Post 1', content: 'Content of post 1' },
      { id: 2, title: 'Post 2', content: 'Content of post 2' },
    ],
    savedPosts: [
      { id: 3, title: 'Saved Post 1', content: 'Content of saved post 1' },
      { id: 4, title: 'Saved Post 2', content: 'Content of saved post 2' },
    ],
    tags: [],
    profilePicture: null, // 프로필 사진 추가
  });
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(()=>{
    axios.get("/getCboardAll").then((res)=>{
      setUD(res.data);
    })
  },[]);

   useEffect(()=>{
    axios.get("/getVboardAll").then((res)=>{
      setUD2(res.data);
      console.log(res.data);
    })
  },[]);

  const handleEnterDetail = boardNo => {
    navigate(`/recruitboard/${boardNo}`);
  };
  const currentData = uniqueData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const currentData2 = uniqueData2.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEditProfile = () => {
    console.log('Editing profile...');
      navigate('/verifyPassword', { state: { email } }); // 비밀번호 확인 페이지로 이동
    };

    const handleHeartClick = () => {
      setHeartClicked(!heartClicked);
      console.log('Heart clicked!');
    };


  return (
    <div className="profile">
      <div className="profile-details">
        <div>
          
          {posts.profilePicture = <img className="pic" src={leegudongsung} alt="Profile" />
          }
          <a className="info">
            <strong></strong> {user.member_nickname}
          </a>
          <a className={`heart-icon ${heartClicked ? 'clicked' : ''}`} onClick={handleHeartClick}>
            <span role="img" aria-label="heart">❤️</span>
          </a>
          <a className={`heart-icon ${heartClicked ? 'clicked' : ''}`} onClick={handleHeartClick}>
            <img src={insta} className="logo" />
          </a>
          <a className="info">
            <strong>@Lee_Gu_Dong_Sung</strong> 
          </a>
        </div>
      </div>
      <div className="posts-container">
        <div className="my-posts">
          <span className="info-post">내 게시물</span>
          <div className="post-content">
            {currentData.map(item => (
            <div key={item.board_no} onClick={() => handleEnterDetail(item.board_no)} className="post-item">
              <a className="post-item">{item.board_title}
              <span className="isdonecheck">{item.recruit_done ? '구인완료' : '구인중'}</span>
              <p>{item.board_writeday.slice(0,10)}</p>
              </a>
            </div>
            ))}
          </div>
        </div>
        <div className="saved-posts">
          <span className="info-post">찜한 게시물</span>
          <div className="post-content">
          {currentData2.map(item => (
            <div key={item.board_no} onClick={() => handleEnterDetail(item.board_no)} className="post-item">
              <a className="post-item">{item.board_title}
              <span className="isdonecheck">{item.recruit_done ? '구인완료' : '구인중'}</span>
              <p>{item.board_writeday.slice(0,10)}</p>
              </a>
            </div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn-right1" onClick={handleEditProfile}>회원정보 수정</button>
      <button className="btn-right2" onClick={()=> navigate('/MessageBoard', { state: { email } })}>쪽지함</button>
      <div className="tags">
        <ul className='tagtop'>
            <li >활발함</li>
            <li>자주</li>
            <li>ISTJ</li>
            <li>즉흥</li>
            <li>자주</li>
            <li>뚜벅이</li>
            <li>서로찍기</li>
            <li>더치페이</li>
            <li>각자먹기</li>
            <li>쇼핑좋음</li>
            <li>남자</li>
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;