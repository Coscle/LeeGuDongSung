import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hifive from '../images/hifive.png';
import './header.css';
import '../fonts/fonts.css';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();
  //const navigate = useNavigate();

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
              <button onClick={logout} className="LogoutBtn">로그아웃</button>
              <Link to="/messageboard">
                <button className="messageBtn">쪽지함</button>
              </Link>
              <Link to="/MyProfile">
                <button className="profileBtn">내 프로필</button>
              </Link>
            </div>
          ) : (
            <Link to="/Login">
              <button className="LoginBtn">로그인</button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}