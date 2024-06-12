import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import hifive from '../images/hifive.png';
import './header.css';
import '../fonts/fonts.css';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(sessionStorage.getItem('loggedInUserEmail')); // 로그인한 사용자의 이메일을 세션에서 가져옴
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
              <button onClick={()=>{logout(); navigate('/');} } className="LogoutBtn">로그아웃</button>
                <button className="messageBtn" onClick ={()=>navigate('/MessageBoard', {state:{email}})}>쪽지함</button>
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