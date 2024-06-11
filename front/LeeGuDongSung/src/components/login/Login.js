import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // 로그인 로직
    console.log('로그인 시도:', username, password);
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
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
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn-primary">로그인하기</button><br/>
        <button type="submit" className="btn-second btn-space">SNS연동</button>
        <button type="submit" className="btn-second btn-space">ID찾기</button>
        <button type="submit" className="btn-second">비밀번호 찾기</button><br/>
        <div className="btn-third">
        	<Link to="/SignUp" className="link">회원가입하기</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
