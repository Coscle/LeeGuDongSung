import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { openDatabase, getUserData, saveUserData } from '../../db'; // 수정된 경로
import './SignUp.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  	//veiryfyPassword의 다음 버튼에서 navigate로 가져온 state(email)
  	//email데이터를 쓸수있게함
  	//|| {}를 사용하여 undefined인 경우 빈 객체를 기본값으로 설정
  	
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [phonePart3, setPhonePart3] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const handleEditProfile = (event) => {
    event.preventDefault();  
    const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;
    navigate('/tagSelectionForEdit', { state: { email,password, phoneNumber, birthDate, gender } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = await openDatabase();
      const userData = await getUserData(db, email);
      if (userData) {
		setPassword(userData.password);
        setPhonePart1(userData.phoneNumber.slice(0, 3));
        setPhonePart2(userData.phoneNumber.slice(3, 7));
        setPhonePart3(userData.phoneNumber.slice(7, 11));
        setBirthDate(userData.birthDate);
        setGender(userData.gender);
      }
    };
    fetchData();
  }, [email]);

  return (
    <div className="signup-container">
      <h2>회원정보 수정</h2>
      <form onSubmit={handleEditProfile}>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='비밀번호를 입력해주세요.'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber"></label>
          <div className="phone-inputs">
            <input
              type="tel"
              id="phonePart1"
              value={phonePart1}
              onChange={(event) => setPhonePart1(event.target.value)}
              maxLength="3"
              placeholder='010'
              required
            /> -
            {' '}
            <input
              type="tel"
              id="phonePart2"
              value={phonePart2}
              onChange={(event) => setPhonePart2(event.target.value)}
              maxLength="4"
	          placeholder='1234'
              required
            /> -
            {' '}
            <input
              type="tel"
              id="phonePart3"
              value={phonePart3}
              onChange={(event) => setPhonePart3(event.target.value)}
              maxLength="4"
              placeholder='5678'
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="birthDate"></label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender"></label>
          <select
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            style={{width: '97%'}}
            required
          >
            <option value="">성별을 선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <button type="submit" className="signup-button">다음으로</button>
      </form>
    </div>
  );
};

export default EditProfile;
