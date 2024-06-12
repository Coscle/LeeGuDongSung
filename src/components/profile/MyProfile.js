import React, { useState, useEffect } from 'react';
import { openDatabase, getUserData } from '../../db'; // 수정된 경로
import './profile.css';
import { useNavigate } from 'react-router';

const MyProfile = () => {
 const navigate = useNavigate();
  const [heartClicked, setHeartClicked] = useState(false);
  const [email, setEmail] = useState(sessionStorage.getItem('loggedInUserEmail')); // 로그인한 사용자의 이메일을 세션에서 가져옴
  const [user, setUser] = useState({	//setUser로 db의 데이터 불러와 user의 아래 값에 넣어 user.으로 호출
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

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const db = await openDatabase(); 	
        //openDatabase 함수를 호출해 IndexedDB 데이터베이스를 열고
        //awiat을 통해 데이터베이스가 열릴 때 까지 기다렸다 db에 저장한다.
        const userData = await getUserData(db, email); 
        // 이메일로 db의 사용자 데이터 가져오기
        if (userData) {	//가져온 userdata가 있다면 
          setUser((prevUser) => ({//setuser 함수를 사용하여 user상태 업데이트
            ...prevUser,					//새로운 사용자 데이터를 덮어쓰는 단계?
            nickname: userData.nickname,
            tags: userData.tags || [],
            profilePicture: userData.profilePicture, // 프로필 사진 설정
          }));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [email]);

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
          {user.profilePicture ? (
            <img className="pic" src={user.profilePicture} alt="Profile" />
          ) : (
            <div className="pic-placeholder">No profile picture</div>
          )}
          <a className="info">
            <strong></strong> {user.nickname}
          </a>
          <a className={`heart-icon ${heartClicked ? 'clicked' : ''}`} onClick={handleHeartClick}>
            <span role="img" aria-label="heart">❤️</span>
          </a>
        </div>
      </div>
      <div className="posts-container">
        <div className="my-posts">
          <h2>내 게시물</h2>
          <div className="post-content">
            {user.posts.map((post) => (
              <div key={post.id} className="post-item">
                <a href={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="saved-posts">
          <h2>찜한 게시물</h2>
          <div className="post-content">
            {user.savedPosts.map((post) => (
              <div key={post.id} className="post-item">
                <a href={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn-right1" onClick={handleEditProfile}>회원정보 수정</button>
      <button className="btn-right2" onClick={()=> navigate('/MessageBoard', { state: { email } })}>쪽지함</button>
      <div className="tags">
        <h2>테그</h2>
        <ul>
          {user.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;