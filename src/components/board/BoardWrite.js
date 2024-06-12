import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './boardWrite.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BoardWrite({ onSubmit, onCancel, tags, category }) {
  // 임시 데이터, member 테이블에 member_no가 1이라는 데이터가 있어야함
  // 그러면 동작
  const [formData, setFormData] = useState({
    board_title: "",
    board_content: "",
    board_category: category,
    author_no: 1,
    cboard_tags: "[]",
    recruit_done: false,
    trip_start: "2024-07-01",
    trip_end: "2024-07-04"
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
	}
    
    if (category === 1) {
      console.log(tags);
      const tmpTag = Object.entries(tags).map(([key, value])=>(
        Object.entries(value).filter(([k,v])=>v===true)
      ));
      var stringJson = '';
      for (let i=0; i<tmpTag.length ; i++){
        if (tmpTag[i].length == 0){
          alert("태그 모두 선택하세요");
          return;
        }
      }
      for (let i=0 ; i<tmpTag.length ; i++){
        for (let j=0 ; j<tmpTag[i].length ; j++){
          stringJson += ''+tmpTag[i][j][0]+'/';
        }
      formData.cboard_tags = stringJson;
      console.log(stringJson);
      }
      axios.post("/postRecruitBoard", formData);
    } else {
      axios.post("/postReviewBoard", formData);
    }
    onSubmit(formData);
  };

  const handleRecruitmentStatusChange = (status) => {
    setFormData((prevState) => ({
      ...prevState,
      isRecruitmentDone: status,
    }));
  };

  return (
    <div className="write-board-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="d-flex align-items-center mb-3">
            {(window.location.pathname === '/recruitboardwrite') && (
              <Dropdown>
		      <Dropdown.Toggle className="custom-dropdown-toggle">
		        {formData.recruit_done ? '구인 완료' : '구인 중'}
		      </Dropdown.Toggle>
		      <Dropdown.Menu className="custom-dropdown-menu">
		        <Dropdown.Item
		          className="custom-dropdown-item"
		          onClick={() => handleRecruitmentStatusChange(false)}
		        >
		          구인 중
		        </Dropdown.Item>
		        <Dropdown.Item
		          className="custom-dropdown-item"
		          onClick={() => handleRecruitmentStatusChange(true)}
		        >
		          구인 완료
		        </Dropdown.Item>
		      </Dropdown.Menu>
		    </Dropdown>
            )}
            <label htmlFor="trip_start" className="me-2">
              여행 시작일
            </label>
		    <input
		        type="date"
		        name="trip_start"
		        id="trip_start"
		        className="form-control me-2 custom-date-input" 
		        value={formData.trip_start}
		        onChange={handleChange}
		        placeholder="여행 시작일"
		      />
		      <label htmlFor="trip_end" className="me-2">
		        여행 종료일
		      </label>
		      <input
		        type="date"
		        name="trip_end"
		        id="trip_end"
		        className="form-control custom-date-input" 
		        value={formData.trip_end}
		        onChange={handleChange}
		        placeholder="여행 종료일"
		      />
          </div>
          <div className="mb-1">
            <input
              type="text"
              name="board_title"
              id="titleInput"
              className="form-control"
              value={formData.board_title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="mb-1">
            <textarea
              name="board_content"
              id="contentTextarea"
              className="form-control contentTextarea"
              value={formData.board_content}
              onChange={handleChange}
              rows="3"
              placeholder="내용을 입력하세요"
            />
          </div>
          <button type="submit" className="writeSubmitBtn">
            게시물 작성
          </button>
          <button type="button" className="canclewriteBtn" onClick={onCancel}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );

export default BoardWrite;