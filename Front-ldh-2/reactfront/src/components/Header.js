import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hifive from '../images/hifive.png';
import './header.css';
import '../fonts/fonts.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // 로그인 버튼 클릭 시 로그인 상태 변경
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 버튼 클릭 시 로그인 상태 변경
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 현재 경로가 '/Login'인지 확인
  const isLoginPage = location.pathname === '/Login';

  return (
    <div className="Header">
      <Link to="/Main">
        <img className="hifive" src={hifive} alt="logo" />
      </Link>

      {isLoginPage ? (
        <Link to="/Main">
          <button className="MainBtn">메인으로</button>
        </Link>
      ) : (
        <>
          {isLoggedIn ? (
            <div>
              <button onClick={handleLogout} className="LogoutBtn">로그아웃</button>
              <Link to="/Message">
                <button className="messageBtn">쪽지함</button>
              </Link>
              <Link to="/MyProfile">
                <button className="profileBtn">내 프로필</button>
              </Link>
            </div>
          ) : (
            <Link to="/Login">
              <button className="LoginBtn" onClick={handleLogin}>로그인</button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}