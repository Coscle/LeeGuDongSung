import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './boardWrite.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardModify({ onSubmit, onCancel }) {
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
  const [tags, setTags] = useState({})
  useEffect(()=>{
    axios.get("/findRecruitBoard/"+boardNo).then((res)=>{
      console.log(res.data);
      setFormData(res.data);
    });
  },[]);
  useEffect(()=>{
    if (formData.cboard_tags != null){
      console.log(formData.cboard_tags);
      setTags(JSON.parse(formData.cboard_tags));
      console.log(formData);
    }
  },[formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.put("/putUpdateBoard", formData);
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
            <Dropdown className="recruitDoneButton">
              <Dropdown.Toggle variant="primary">
                {formData.recruit_done ? '구인 완료' : '구인 중'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleRecruitmentStatusChange(false)}>
                  구인 중
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRecruitmentStatusChange(true)}>
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
              className="form-control me-2"
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
              className="form-control"
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
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              onChange={handleFileChange}
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
}

export default BoardModify;