import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardWrite from '../board/BoardWrite';
import SideFilter from '../board/SideFilter';
import './recruitBoardWrite.css';

function RecruitBoardWrite() {
  const navigate = useNavigate();
  const [tags, setTags] = useState();

  const handleSubmit = (formData) => {
    // 폼 데이터 처리 (예: 서버로 전송)
    console.log('Form data:', formData);

    // 데이터 저장 후 목록 페이지로 이동
    navigate('/recruitboard', ()=>{window.location.reload()});
  };
  useEffect(()=>{
    try{
      console.log(tags.gender);
      const tmpTag = Object.entries(tags).map(([key, value])=>(
        Object.entries(value).filter(([k,v])=>v===true)
      ));
      console.log(tmpTag);
    } catch {}
  },[tags]);

  return (
    <div className="write-board-container">
      <div className="side-filter">
        <SideFilter showTopSearch={false} setTags={setTags} tags={tags} />
      </div>
      <div className="board-write-container">
      	<h1>여행 메이트 찾기</h1>
        <BoardWrite tags={tags} onSubmit={handleSubmit} onCancel={() => navigate('/recruitboard')} />
      </div>
    </div>
  );
}

export default RecruitBoardWrite;