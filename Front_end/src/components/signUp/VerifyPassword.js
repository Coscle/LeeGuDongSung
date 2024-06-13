import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import  AuthContext  from '../../AuthContext.js'; // Import AuthContext
import axios from 'axios';
import Swal from 'sweetalert2'
import './SignUp.css';

const VerifyPassword = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); // useLocation 사용
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
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
      const response = await axios.post('/login', { member_id: user.member_id, member_pw: password });
      console.log(response);
      if (response.status === 200 && response.data != "") {
        navigate('/EditProfile');
      } else {
        sweetalert('비밀번호가 틀렸습니다.', '', 'error', '확인');
      }
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      sweetalert('비밀번호 확인 중 오류가 발생했습니다.', '', 'error', '확인');
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