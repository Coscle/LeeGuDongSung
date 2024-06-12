import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './boardWrite.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardModify({ onSubmit, onCancel, tags, category}) {
  const {boardNo} = useParams();
  // const [formData, setFormData] = useState({
  //   title: '',
  //   tags: '',
  //   content: '',
  //   startDate: '',
  //   endDate: '',
  //   isRecruitmentDone: false,
  //   photo: null,
  // });
  const [formData, setFormData] = useState([]);
  useEffect(()=>{
    if (category === 1){
      axios.get("/findRecruitBoard/"+boardNo).then((res)=>{
        console.log(res.data);
        setFormData(res.data);
      });
    } else {
      axios.get("/findReviewBoard/"+boardNo).then((res)=>{
        console.log(res.data);
        setFormData(res.data);
      });
    }
  },[]);
  
  useEffect(()=>{
    console.log(tags);
  },[tags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.trip_start) > new Date(formData.trip_end)) {
	  alert("올바른 날짜를 입력하세요");
	  return;
	}
    
    
    if (category === 1) {
      const tmpTag = Object.entries(tags).map(([key, value])=>(
        Object.entries(value).filter(([k,v])=>v===true)
      ));
      var stringJson = '';
      var tmp;
      for (let i=0; i<tmpTag.length ; i++){
        if (tmpTag[i].length == 0){
          alert("태그를 모두 선택하세요");
          return;
        }
      }
      for (let i=0 ; i<tmpTag.length ; i++){
        if(i == tmpTag.length-1){
          for (let j=0 ; j<tmpTag[i].length ; j++){
            stringJson += ''+tmpTag[i][j][0]+'';
          }
        } else{
          for (let j=0 ; j<tmpTag[i].length ; j++){
            stringJson += ''+tmpTag[i][j][0]+'/';
          }
        }
      }
      formData.cboard_tags = stringJson;
      console.log(formData);
      axios.put("/putUpdateBoard", formData);
    } else {
      axios.put("/putUpdateBoard", formData);
    }
    onSubmit(formData);
  };

  const handleRecruitmentStatusChange = (status) => {
    setFormData((prevState) => ({
      ...prevState,
      recruit_done: status,
    }));
  };


  return (
    <div className="write-board-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="d-flex align-items-center mb-3">
            <Dropdown className="recruitDoneButton">
               <Dropdown.Toggle className="custom-dropdown-toggle">
                {formData.recruit_done ? '구인 완료' : '구인 중'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleRecruitmentStatusChange(false)}>
                  구인 중
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleRecruitmentStatusChange(true)}>
                  구인 완료
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <label htmlFor="startDate" className="me-2">
              여행 시작일:
            </label>
            <input
              type="date"
              name="trip_start"
              id="startDate"
              className="form-control me-2 custom-date-input"
              value={formData.trip_start}
              onChange={handleChange}
              placeholder="여행 시작일"
            />
            <label htmlFor="endDate" className="me-2">
              여행 종료일:
            </label>
            <input
              type="date"
              name="trip_end"
              id="endDate"
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
            게시물 수정
          </button>
          <button type="button" className="canclewriteBtn" onClick={onCancel}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default BoardModify;