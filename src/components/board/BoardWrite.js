import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './boardWrite.css';
import axios from 'axios';

function BoardWrite({ onSubmit, onCancel, tags }) {
  // const [formData, setFormData] = useState({
  //   board_title: '',
  //   tags: '',
  //   board_content: '',
  //   startDate: '',
  //   endDate: '',
  //   isRecruitmentDone: false,
  //   photo: null,
  // });

  // 임시 데이터, member 테이블에 member_no가 1이라는 데이터가 있어야함
  // 그러면 동작
  const [formData, setFormData] = useState({
    board_title: "",
    board_content: "",
    board_category: 1,
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

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tmpTag = Object.entries(tags).map(([key, value])=>(
      Object.entries(value).filter(([k,v])=>v===true)
    ));
    var stringJson = '[';
    var tmp;
    for (let i=0; i<tmpTag.length ; i++){
      if (tmpTag[i].length == 0){
        alert("태그 모두 선택하세요");
        break;
      }
      tmp = Object.entries(tags).map(([key, value])=>(
        Object.entries(value).filter(([k,v])=>v===true)
      ));
    }
    console.log(tmp.length)
    for (let j=0 ; j<tmp.length ; j++){
      console.log(tmp[j][0]);
      if(j == tmp.length-1){
        stringJson += '"'+tmp[j][0][0]+'"]';
      } else{
        stringJson += '"'+tmp[j][0][0]+'",';
      }
    }
    formData.tags = stringJson;
    console.log(formData);
    axios.post("/postRecruitBoard", formData);
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
            )}
            <label htmlFor="trip_start" className="me-2">
              여행 시작일:
            </label>
            <input
              type="date"
              name="trip_start"
              id="trip_start"
              className="form-control me-2"
              value={formData.trip_start}
              onChange={handleChange}
              placeholder="여행 시작일"
            />
            <label htmlFor="trip_end" className="me-2">
              여행 종료일:
            </label>
            <input
              type="date"
              name="trip_end"
              id="trip_end"
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

export default BoardWrite;