import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // 세션에서 사용자 데이터 가져오기
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const { email: savedEmail, password: savedPassword } = JSON.parse(userData);
      // 입력한 이메일과 비밀번호가 세션에 저장된 데이터와 일치하는지 확인
      if (email === savedEmail && password === savedPassword) {
        setLoggedIn(true);
        console.log('로그인에 성공했습니다.');
        alert('로그인에 성공했습니다.');
      } else {
        console.log('로그인에 실패했습니다.');
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } else {
      console.log('세션에 사용자 데이터가 없습니다.');
      alert('세션에 사용자 데이터가 없습니다. 회원가입을 먼저 진행해주세요.');
    }
  };

  // 이미 로그인된 경우 로그인 폼 대신 환영 메시지 표시
  if (loggedIn) {
    return (
      <div>
        <h2>환영합니다!</h2>
        <p>로그인 되었습니다.</p>
        <Link to="/">홈으로 이동</Link>
      </div>
    );
  }

  // 로그인 폼
  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
             placeholder="아이디(이메일)을 입력해주세요"
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
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          로그인하기
        </button>
        <button type="button" className="btn-second">SNS연동</button>
        <button type="button" className="btn-second">ID찾기</button>
        <button type="button" className="btn-second">비밀번호 찾기</button>
        <div className="btn-third">
          <Link to="/SignUp" className="link">회원가입하기</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
