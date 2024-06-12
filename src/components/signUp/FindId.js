import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openDatabase, getUserDataBySnsAddress} from '../../db'; 
import Swal from 'sweetalert2'
import './SignUp.css';

const FindId = () => {
  const navigate = useNavigate(); 
  const [snsAddress, setSnsAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleFindId = async (event) => {
    event.preventDefault(); 

  const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
            })
    }

    try {
      const db = await openDatabase();
      const userSNS = await getUserDataBySnsAddress(db, snsAddress);
      if (userSNS) {
        setEmail(userSNS.email); // 이메일을 상태로 설정
      } else {
        sweetalert('해당 SNS 정보로 등록된 이메일이 없습니다.');
      }
    } catch (error) {
      console.error('아이디 찾기 중 오류 발생:', error);
      sweetalert('아이디 찾기 중 오류가 발생했습니다.');
    }
  };
      

  return (
    <div className="signup-container">
      <h2>아이디 찾기</h2>
      <form onSubmit={handleFindId}>
        <div className="form-group">
          <label htmlFor="snsAddress"></label>
          <input
            type="text"
            id="snsAddress"
            value={snsAddress}
            onChange={(event) => setSnsAddress(event.target.value)}
            placeholder="SNS 주소를 입력해주세요."
            required
          />
        </div>
        <button type="submit" className="signup-button">아이디 찾기</button>
        <button type="button" className="signup-button" onClick={()=>{navigate('/FindPassWord')}}>비밀번호 찾기</button>
      </form>
      {email && (
        <div className="result">
          <br/><h3>회원님의 이메일(Id)입니다.<br/><br/>email : {email}<br/><br/>아이디를 잊지않게 주의해주세요!</h3>
        </div>
      )}
    </div>
  );
};

export default FindId;
