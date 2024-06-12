import React, { useState, useEffect } from 'react';
import BoardModify from '../board/BoardModify';
import SideFilter from '../board/SideFilter';
import { useNavigate } from 'react-router-dom';
import './recruitBoardModify.css';

  const RecruitBoardModify = () => {
  const [initialValues, setInitialValues] = useState({}); // 초기 값으로 빈 객체를 설정
  const navigate = useNavigate();
  const [tags, setTags] = useState();
  const [filtering, setFilter] = useState([]);

  const handleSubmit = (formData) => {
    console.log('Modified form data:', formData);
    // 여기에서 수정된 내용을 서버로 전송하거나 다른 작업을 수행
    navigate('/recruitboard', ()=>{window.location.reload()}); 
  };

  return (
    <div className="modify-board-container">
      <div className="side-filter">
        <SideFilter showTopSearch={false} tags={tags} setTags={setTags} filtering={filtering} setFilter={setFilter} />
      </div>
      <div className="board-write-container">
          <h1 className="board-write-title">여행 메이트 찾기</h1>
        <BoardModify initialValues={initialValues} tags={tags} setTags={setTags} onSubmit={handleSubmit} isModify={true} category={1} />
      </div>
    </div>
  );
};

export default RecruitBoardModify;