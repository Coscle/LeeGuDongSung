import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openDatabase, getUserData } from '../../db'; // 수정된 경로
import './login.css';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use AuthContext

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const db = await openDatabase();
      const userData = await getUserData(db, email);
      if (userData) {
        const { email: savedEmail, password: savedPassword } = userData;
        // 입력한 이메일과 비밀번호가 IndexedDB에 저장된 데이터와 일치하는지 확인
        if (email === savedEmail && password === savedPassword) {
          sessionStorage.setItem('loggedInUserEmail', email); // 로그인한 사용자의 이메일을 세션에 저장
          login(); // Context의 login 함수 호출
          console.log('로그인에 성공했습니다.');
          alert('로그인에 성공했습니다.');
          navigate('/'); 
        } else {
          console.log('로그인에 실패했습니다.');
          alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
      } else {
        console.log('IndexedDB에 사용자 데이터가 없습니다.');
        alert('회원가입을 먼저 진행해주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

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
