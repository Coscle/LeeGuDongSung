import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openDatabase,  getUserDataByPassword} from '../../db'; 
import './SignUp.css';

const VerifyPassword = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleVerifyPassword = async (event) => {
    event.preventDefault(); 

    try {
      const db = await openDatabase();
      const userPassword = await getUserDataByPassword(db, password);
      if (userPassword) {
        setEmail(userPassword.email);
		} else {
        alert('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      alert('비밀번호 확인 중 오류가 발생했습니다.');
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
      {email && (
        <div className="result">
          <br/><button onClick={()=>navigate('/EditProfile', {state: {email}})} className='signup-button'>
          다음 (내 정보 입력)</button>
        </div>
      )}
    </div>
  );
};

export default VerifyPassword;
