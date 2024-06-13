import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import Swal from 'sweetalert2'


const SignUp = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [phonePart3, setPhonePart3] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const sweetalert = (title, contents, icon, confirmButtonText) => {
    Swal.fire({
        title: title,
        text: contents,
        icon: icon,
        confirmButtonText: confirmButtonText
        })
  }

  const handleSignUp = async (event) => {
     event.preventDefault();	//기본 제출 동작을 막음
     // 비밀번호 확인
     if(phonePart1.length != 3 || phonePart1 !== '010'){
        setError('전화번호 첫 부분 형식이 맞지 않습니다. 010으로 입력해주세요!');
        return;
     }
     if(phonePart2.length != 4){
        setError('전화번호 두 번째 부분 형식이 올바르지 않습니다. 4자리로 입력해주세요!');
        return;
     }
    if(phonePart3.length != 4){
        setError('전화번호 세 번째 부분 형식이 올바르지 않습니다. 4자리로 입력해주세요!');
        return;
    }
    if (password !== confirmPassword) {
      sweetalert("비밀번호가 일치하지 않습니다.",'','','확인');
      return;
    }
    
    
    // 회원가입 로직
    const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;
    const userData = {
      member_id: email,
      member_pw: password,
      member_birth: birthDate,
      member_gender: gender === 'male' ? 1 : 2,
      member_tel: phoneNumber,
    };
    console.log('회원가입 시도:', email, password, confirmPassword, phoneNumber, birthDate, gender);
  
    try {
      const response = await axios.post('/member', userData);
      if (response.status === 201) {
        console.log('다음페이지로 이동:', response.data);
        navigate('/SignUp/TagSelection', { state: { email, phoneNumber, birthDate, gender, password } });
      } else {
        console.error('회원가입 실패:', response.data);
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error);
    }
      // 테그 선택 페이지로 이동
  };

  return (
      <div className="signup-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="아이디(이메일)을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="비밀번호를 다시 입력해주세요"
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
                placeholder="010"
                required
              /> -
              {' '}
              <input
                type="tel"
                id="phonePart2"
                value={phonePart2}
                onChange={(event) => setPhonePart2(event.target.value)}
                maxLength="4"
                placeholder="1234"
                required
              /> -
              {' '}
              <input
                type="tel"
                id="phonePart3"
                value={phonePart3}
                onChange={(event) => setPhonePart3(event.target.value)}
                maxLength="4"
                placeholder="5678"
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
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
  );
};

export default SignUp;