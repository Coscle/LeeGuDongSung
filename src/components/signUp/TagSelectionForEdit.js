import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const TagSelectionForEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email = '', password = '', phoneNumber = '', birthDate = '', gender = '' } = location.state || {};
  // 기본값을 빈 문자열로 설정
  // const { email, password, phoneNumber, birthDate, gender } = location.state || {};

  const [selectedTags, setSelect ,editTags] = useState([]);
  const [nickname, setNickname] = useState('');
  const [snsType, setSnsType] = useState('');
  const [snsAddress, setSnsAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const tags = [
    { title: '성격', content: ['활발함', '정적임', '중간'] },
    { title: '여행빈도', content: ['자주', '적당히', '조금'] },
    { title: 'mbti', content: ['ISTJ', 'ISTP', 'ISFJ', 'ISFP', 'INTJ', 'INTP', 'INFJ', 'INFP', 'ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP'] },
    { title: '여행스타일', content: ['즉흥', '계획'] },
    { title: '음주', content: ['자주', '적당히', '조금'] },
    { title: '이동수단', content: ['뚜벅이', '대중교통', '택시'] },
    { title: '사진찍기', content: ['서로찍기', '사진싫어요', '찍기만'] },
    { title: '결제방식', content: ['더치페이', '공금걷기'] },
    { title: '식사유형', content: ['각자먹기', '같이먹기'] },
    { title: '쇼핑선호', content: ['쇼핑좋음', '쇼핑싫음'] },
    { title: '성별', content: ['남자', '여자'] },
  ];

  const handleTagChange = (content, index) => {
    const updatedSelectedTags = [...selectedTags];
    updatedSelectedTags[index] = content;
    setSelectedTags(updatedSelectedTags);
  };

  useEffect(() => {
    axios.get('/editProfile/'+email)
      .then(response => {
        const userData = response.data;
        setNickname(userData.nickname);
        setSnsType(userData.snsType);
        setSnsAddress(userData.snsAddress);
        setSelectedTags(userData.tags || []);
        setProfilePicture(userData.profilePicture);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, [email]);

   const handleComplete = (event) => {
    event.preventDefault();
    const isAnyTagUnselected = tags.some((tag, index) => !selectedTags[index]);
    if (isAnyTagUnselected) return;

    const userData = {
      member_pw: password,
      member_birth: birthDate,
      member_gender: gender,
      member_nickname: nickname,
      member_snsurl: snsAddress
    };

    
    axios.put('/editProfile/'+email, userData)
      .then(() => {
        console.log('User data saved:', userData);
        navigate('/');
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });
  };

  return (
    <div className="tag-selection-wrapper">
      <div className='info-container'>
        <h2>개인정보 입력</h2>
        <form onSubmit={handleComplete}>
          <div className="form-group">
            <label htmlFor="nickname"></label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="snsType"></label>
            <select
              id="snsType"
              value={snsType}
              onChange={(e) => setSnsType(e.target.value)}
              style={{ width: '97%' }}
              required
            >
              <option value="">SNS 타입을 선택해주세요</option>
              <option value="1">Instagram</option>
              <option value="2">FaceBook</option>
              <option value="3">X</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="snsAddress"></label>
            <input
              type="text"
              id="snsAddress"
              value={snsAddress}
              onChange={(e) => setSnsAddress(e.target.value)}
              placeholder="SNS 주소를 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">프로필 사진 첨부</label>{'   '}
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <button type="submit" className="signup-button" onClick={()=>alert('수정이 완료되었습니다.')}>수정 완료</button>
        </form>
      </div>
      <div className="tag-container">
        <h2>테그를 선택해주세요</h2>
        {tags.map((tag, index) => (
          <div key={index} className="tag-row">
            <h4>{tag.title}</h4>
            {tag.content.map((content, tagIndex) => (
              <button
                key={tagIndex}
                type="button"
                className={`tag-button ${selectedTags[index] === content ? 'selected' : ''}`}
                onClick={() => handleTagChange(content, index)}
              >
                {content}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelectionForEdit;