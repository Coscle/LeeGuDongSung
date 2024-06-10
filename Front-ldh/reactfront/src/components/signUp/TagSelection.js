import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SignUp.css';

const TagSelection = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); // signUp 페이지에서 입력한 데이터를 가져옴
  const { email, phoneNumber, birthDate, gender, password } = location.state || {};
  
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [nickname, setNickname] = useState('');
  const [snsType, setSnsType] = useState('');
  const [snsAddress, setSnsAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  
  const tags = [
    { title: '성격', content: ['활발함', '정적임', '중간'] },
    { title: '여행빈도', content: ['자주', '적당히', '조금'] },
    { title: 'mbti', content: ['ISTJ', 'ISTP', 'ISFJ', 'ISFP', 'INTJ', 'INTP', 'INFJ', 'INFP', 'ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP'] },
    { title: '여행스타일 ', content: ['즉흥', '계획'] },
    { title: '음주', content:['자주', '적당히', '조금'] },
    { title: '이동수단', content:['뚜벅이', '대중교통', '택시'] },
    { title: '사진찍기', content:['서로찍기', '사진싫어요', '찍기만'] },
    { title: '결제방식', content: ['더치페이', '공금걷기'] },
    { title: '식사유형', content: ['각자먹기', '같이먹기'] },
    { title: '쇼핑선호', content: ['쇼핑좋음', '쇼핑싫음'] },
    { title: '성별', content: ['남자', '여자'] },
    // 테그추가
  ];

  const handleTagChange = (content, index) => {
    const updatedSelectedTags = [...selectedTags];
    updatedSelectedTags[index] = content;
    setSelectedTags(updatedSelectedTags);
  };

  useEffect(() => {
    // 선택된 태그가 변경될 때마다 호출되는 부분
    console.log("선택된 태그:", selectedTags);
  }, [selectedTags]); // 선택된 태그가 변경될 때만 useEffect 실행

  useEffect(() => {
    // password 상태가 변경될 때마다 호출되는 부분
    console.log("비밀번호:", password);
  }, [password]); // password가 변경될 때만 useEffect 실행

  const handleComplete = (event) => {
    event.preventDefault(); // 기본 제출 동작을 막음
    // 선택되지 않은 태그가 있는지 확인
    const isAnyTagUnselected = tags.some((tag, index) => !selectedTags[index]);
    // 선택되지 않은 태그가 있는 경우 함수를 종료하고 폼 제출을 막음
    if (isAnyTagUnselected) return;
    //가입 완료 후 로그인 처리
    //로그인 상태를 관리하는 함수를 호출해 로그인 상태로 설정
    handleLogin(email, phoneNumber, birthDate, gender, nickname, snsType, snsAddress, profilePicture, password); // SignUp 페이지에서 받아온 비밀번호 전달
    // 데이터 전송 후 홈페이지로 이동
    navigate('/');
  };
  
  const handleLogin = (email, phoneNumber, birthDate, gender, nickname, snsType, snsAddress, profilePicture, password) => {
    // 로그인 상태로 설정하고 사용자 정보를 저장하는 로직 작성
    // 세션에 사용자 정보를 저장합니다.
    const userData = {
      email,
      phoneNumber,
      birthDate,
      gender,
      nickname,
      snsType,
      snsAddress,
      profilePicture,
      password
    };
    // 세션에 사용자 정보를 저장
    sessionStorage.setItem('userData', JSON.stringify(userData));
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
              style={{width: '97%'}}
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
          <button type="submit" className="signup-button">가입 완료</button>
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
                type="button" //기본 제출 동작 막음
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

export default TagSelection;
