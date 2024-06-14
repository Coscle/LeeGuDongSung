import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import Swal from 'sweetalert2'

const TagSelection = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); // signUp 페이지에서 입력한 데이터를 가져옴
  const { email, phoneNumber, birthDate, gender, password } = location.state || {};
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [nickname, setNickname] = useState('');
  const [snsType, setSnsType] = useState('');
  const [snsAddress, setSnsAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const sweetalert = (title, contents, icon, confirmButtonText) => {
    Swal.fire({
        title: title,
        text: contents,
        icon: icon,
        confirmButtonText: confirmButtonText
        })
  }
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
    console.log("선택된 태그:", selectedTags);
  }, [selectedTags]);

  const handleComplete = async (event) => {
    event.preventDefault();
    const isAnyTagUnselected = tags.some((tag, index) => !selectedTags[index]);
    if (isAnyTagUnselected) 
      sweetalert('선택되지않은 태그가 있습니다.','','','확인');
    /*
    const userData = {
      member_nickname: nickname,
      member_snsurl: snsAddress,
      // my_tags: selectedTags
    };
    */

    try {
      const response = await axios.put('/signUp/'+email, {
        member_nickname: nickname,
        member_snsurl: snsAddress,
        // my_tags: selectedTags
      });
      if (response.status === 201) {
        console.log('User data saved:', response.data);
        sweetalert('회원가입이 완료되었습니다.','','','확인');
        navigate('/');
      } else {
        console.error('Saving user data failed:', response.data);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }

  };



  return (
    <div className="tag-selection-wrapper">
      <div className='info-container'>
        <h2 className="tagtitles">개인정보 입력</h2>
        <form onSubmit={handleComplete}>
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
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
            <label htmlFor="snsType">SNS 타입</label>
            <select
              id="snsType"
              value={snsType}
              onChange={(e) => setSnsType(e.target.value)}
              style={{ width: '100%' }}
              required
            >
              <option value="">SNS 타입을 선택해주세요</option>
              <option value="1">Instagram</option>
              <option value="2">FaceBook</option>
              <option value="3">X</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="snsAddress">SNS 주소</label>
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
            <label htmlFor="profilePicture">프로필 사진 첨부</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <button type="submit" className="signup-button" >가입 완료</button>
        </form>
      </div>
      <div className="tag-containerss">
      <h2 className="tagtitles">태그를 선택해주세요</h2>
  {tags.map((tag, index) => (
    <div key={index} className="tag-row">
      <span className="tagkind">{tag.title}</span>
      <div className="tag-buttons-container">
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
    </div>
  ))}
</div>
    </div>
  );
};

export default TagSelection;