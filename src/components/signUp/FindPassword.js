import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openDatabase, getUserData, getUserDataByPhoneNumber} from '../../db'; 
import './SignUp.css';

const FindPassword = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  
  const handleFindPassword = async (event) => {
    event.preventDefault(); 

    try {
      const db = await openDatabase();
      const userEmail = await getUserData(db, email);
      const userPhoneNumber = await getUserDataByPhoneNumber(db, phoneNumber);
      if (userPhoneNumber) {
	    setPassword(userEmail.password); 
		if(userEmail){
			setPhoneNumber(userPhoneNumber.phoneNumber);
		}
      } else {
        alert('해당 아이디가 없습니다.');
      }
    } catch (error) {
      console.error('비밀번호 찾기 중 오류 발생:', error);
      alert('비밀번호 찾기 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleFindPassword}>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일(id)를 입력해주세요."
            required
          />
          <label htmlFor="phoneNumber"></label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="전화번호를 입력해주세요."
            required
          />
        </div>
        <button type="submit" className="signup-button">비밀번호 찾기</button>
        <button type="button" className="signup-button" onClick={()=>{navigate('/findId')}}>아이디 찾기</button>
      </form>
      {password && (
        <div className="result">
          <br/><h3>회원님의 비밀번호입니다.<br/>
          <br/>password : {password}<br/>
          <br/>비밀번호를 잊지않게 주의해주세요!</h3>
        </div>
      )}
    </div>
  );
};

export default FindPassword;
