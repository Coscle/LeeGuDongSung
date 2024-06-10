import React, { useState } from 'react';
import './profile.css';

const UserProfile = () => {
  const [heartClicked, setHeartClicked] = useState(false); // 상태 추가

  const user = {
    nickname: 'Jerry',
    posts: [
      { id: 1, title: 'Post 1', content: 'Content of post 1' },
      { id: 2, title: 'Post 2', content: 'Content of post 2' },
    ],
    savedPosts: [
      { id: 3, title: 'Saved Post 1', content: 'Content of saved post 1' },
      { id: 4, title: 'Saved Post 2', content: 'Content of saved post 2' },
    ],
    tags: ['intp', '정적인', '즉흥', '남자', '뚜벅이', '찍어주기만', '쇼핑좋음'],
  };

  const handleEditProfile = () => {
    console.log('Editing profile...');
  };

  const handleHeartClick = () => {
    setHeartClicked(!heartClicked); // 클릭 상태 업데이트
    console.log('Heart clicked!');
  };

  return (
    <div className="profile">
      <div className="profile-details">
        <div>
          <a className="pic" href = "/RecruitBoard/userProfile"></a>
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
          <h2> {user.nickname} 님의 게시물</h2>
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
              <a className="post-item">안녕하세요 여행에 진심인 Jerry입니다. 잘부탁드려요~<br/>
              여행을 사랑하시는 좋은 분들과 함께하고싶어요!</a>
          </div>
        </div>
      </div>
      <button className="btn-right1" onClick={handleEditProfile}>쪽지 보내기</button>
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
