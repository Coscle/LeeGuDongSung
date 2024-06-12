import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { openDatabase, getUserData } from '../../db'; // 수정된 경로
import Swal from 'sweetalert2'
import './profile.css';

const UserProfile = () => {
  const { userId } = useParams(); // URL에서 userId(이메일) 가져오기
  const [heartClicked, setHeartClicked] = useState(false);
  const [user, setUser] = useState({
    nickname: '',
    posts: [],
    savedPosts: [],
    tags: [],
    profilePicture: null, // 프로필 사진 추가
    selfIntroduction: ''
  });
  const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
            })
    }
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const db = await openDatabase();
        const userData = await getUserData(db, userId); // userId로 데이터 가져오기
        if (userData) {
          setUser({
            nickname: userData.nickname,
            posts: userData.posts || [],
            savedPosts: userData.savedPosts || [],
            tags: userData.tags || [],
            profilePicture: userData.profilePicture,
            selfIntroduction: userData.selfIntroduction
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [userId]);

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
      <button className="btn-right2" onClick={() => sweetalert('유저가 차단되었습니다.')}>차단하기</button>
      <div className="posts-container">
        <div className="my-posts">
          <h2>{user.nickname} 님의 게시물</h2>
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
          <h2>자기소개</h2>
          <div className="post-content">
            <a className="post-item">{user.selfIntroduction}</a>
          </div>
        </div>
      </div>
      <button className="btn-right1" onClick={() => sweetalert('쪽지를 보내시겠습니까?')}>쪽지 보내기</button>
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

export default UserProfile;
