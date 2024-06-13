import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import  AuthContext  from '../../AuthContext.js'; // Import AuthContext

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { email } = location.state || {};
  const { user } = useContext(AuthContext);
  const { email = user.member_id} = location.state || {};
  // 기본값을 빈 문자열로 설정

     //veiryfyPassword의 다음 버튼에서 navigate로 가져온 state(email)
     //email데이터를 쓸수있게함
     //|| {}를 사용하여 undefined인 경우 빈 객체를 기본값으로 설정
     
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [phonePart3, setPhonePart3] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState();
  const [password, setPassword] = useState('');

  const handleEditProfile = (event) => {
    event.preventDefault();  
    const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;
    console.log("hi")


    //navigate('/tagSelectionForEdit', { state: { email, password, phoneNumber, birthDate, gender } });
    console.log(user.member_id, password, phoneNumber, birthDate, gender)
    axios.post('/editProfile', {
      member_id: user.member_id,
      member_pw: password,
      member_tel: phoneNumber,
      member_birth: birthDate,
      member_gender: gender

    }).catch(error => {
      console.error('There was an error updating the profile!', error);
    });/*
    .then(() => {
      navigate('/tagSelectionForEdit', { state: { email, password, phoneNumber, birthDate, gender } });
    })
    .catch(error => {
      console.error('There was an error updating the profile!', error);
    });*/

  };
  // useEffect(() => {
  //   axios.get('/selectMyinfo/'+ user.member_id)
  //     .then(response => {
  //       console.log("get");
  //       console.log(response.data);
  //       const userData = response.data;
  //       setPassword(userData.member_pw);
  //       setPhonePart1(userData.member_tel.slice(0, 3));
  //       setPhonePart2(userData.member_tel.slice(3, 7));
  //       setPhonePart3(userData.member_tel.slice(7, 11));
  //       setBirthDate(userData.member_birth);
  //       setGender(userData.member_gender);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the user data!', error);
  //     });
  // }, []);

  

  return (
    <div className="signup-container">
      <h2>회원정보 수정</h2>
      <form onSubmit={handleEditProfile}>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            value={user.member_id}
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
            <option value={0}>남성</option>
            <option value={1}>여성</option>
          </select>
        </div>
        <button type="submit" className="signup-button">다음으로</button>
      </form>
    </div>
  );
};

export default EditProfile;