import React, { useState, useEffect } from 'react';
import { openDatabase, getUserData } from '../../db'; // 수정된 경로
import './profile.css';

const MyProfile = () => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [user, setUser] = useState({
    nickname: '',
    posts: [],
    savedPosts: [],
    tags: [],
  });
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const db = await openDatabase();
        const email = sessionStorage.getItem('loggedInUserEmail'); // 세션에서 이메일 가져오기
        if (email) {
          const userData = await getUserData(db, email); // 이메일로 사용자 데이터 가져오기
          if (userData) {
            setUser({
              ...userData,
              posts: userData.posts || [],
              savedPosts: userData.savedPosts || [],
              tags: userData.tags || [],
            });
          } else {
            console.error('No user data found for email:', email);
          }
        } else {
          console.error('No email found in session');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // 데이터 로드 완료 후 로딩 상태 해제
      }
    };

    loadUserData();
  }, []);

  const handleHeartClick = () => {
    setHeartClicked(!heartClicked);
    console.log('Heart clicked!');
  };

  const handleEditProfile = () => {
    console.log('Editing profile...');
    // 추가적인 프로필 수정 로직을 여기서 처리합니다.
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  if (!user) {
    return <div>No user data found.</div>; // 유저 데이터가 없을 때 표시
  }

  return (
    <div className="profile">
      <div className="profile-details">
        <div>
          <a className="pic" href="/Myprofile"></a>
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
      <button className="btn-right2" onClick={handleEditProfile}>쪽지함</button>
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
