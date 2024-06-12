import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import { openDatabase, getUserDataByPassword } from '../../db'; 
import Swal from 'sweetalert2'
import './SignUp.css';

const VerifyPassword = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); // useLocation 사용
  const { email } = location.state || {}; // 전달된 state에서 email 추출
  const [password, setPassword] = useState('');
  const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
            })
    }
  const handleVerifyPassword = async (event) => {
    event.preventDefault(); 

    try {
      const db = await openDatabase();
      const userPassword = await getUserDataByPassword(db, password);
      if (userPassword && userPassword.email === email) { // 이메일이 일치하는지 확인
        navigate('/EditProfile', { state: { email } });
      } else {
        sweetalert('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      sweetalert('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>비밀번호 확인</h2>
      <form onSubmit={handleVerifyPassword}>
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
        <button type="submit" className="signup-button">비밀번호 확인</button>
      </form>
    </div>
  );
};

export default VerifyPassword;
