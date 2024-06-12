import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openDatabase, getUserData } from '../../db';
import axios from 'axios';
import './login.css';
import  AuthContext  from '../../AuthContext.js'; // Import AuthContext

const Login = () => {
  const [member_id, setMemberId] = useState('');
  const [member_pw, setMemberPw] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use AuthContext

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', {
        member_id,
        member_pw
      });

      if (response.status === 200) {
        // 로그인 성공시
        const userData = response.data; // 서버로부터 받은 사용자 데이터
        
        
       // sessionStorage.setItem('loggedInUser', JSON.stringify(userData)); // 로그인한 사용자의 데이터를 세션에 저장 
        //const loggedInUserData = JSON.parse(sessionStorage.getItem('loggedInUser'));
        login(userData);  // Context의 login 함수 호출
        console.log('로그인에 성공했습니다.');
        navigate('/'); 

      } else {
        // 로그인 실패 시
        console.log('로그인에 실패했습니다.');
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
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
            id="member_id"
            value={member_id}
            onChange={(event) => setMemberId(event.target.value)}
            placeholder="아이디(이메일)을 입력해주세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="member_pw"
            value={member_pw}
            onChange={(event) => setMemberPw(event.target.value)}
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          로그인하기
        </button>
        <button type="button" className="btn-second">SNS연동</button>
        <button type="button" className="btn-second" onClick = {()=>{navigate('/FindId');}}>ID찾기</button>
        <button type="button" className="btn-second">비밀번호 찾기</button>
        <button type = "button" className = "btn-third" onClick={()=>{ navigate('/SignUp');} }>회원가입하기</button>
      </form>
    </div>
  );
};

export default Login;