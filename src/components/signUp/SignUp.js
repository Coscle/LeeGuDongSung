import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [phonePart3, setPhonePart3] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    // 회원가입 로직
    const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;
    console.log('회원가입 시도:', email, password, confirmPassword, phoneNumber, birthDate, gender);
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
            style={{ width: '95%' }} 
            required
          >
            <option value="">성별을 선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <button type="submit" className="signup-button">가입하기</button>
      </form>
    </div>
  );
};

export default SignUp;
