import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './boardWrite.css';

function BoardWrite({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    content: '',
    startDate: '',
    endDate: '',
    isRecruitmentDone: false,
    photo: null,
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
            {(window.location.pathname === '/recruitboardwrite' || window.location.pathname.includes('/recruitboard/modify')) && (
              <Dropdown className="recruitDoneButton">
                <Dropdown.Toggle variant="primary">
                  {formData.isRecruitmentDone ? '구인 완료' : '구인 중'}
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
            <label htmlFor="startDate" className="me-2">
              여행 시작일:
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="form-control me-2"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="여행 시작일"
            />
            <label htmlFor="endDate" className="me-2">
              여행 종료일:
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="여행 종료일"
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              name="title"
              id="titleInput"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="mb-1">
            <textarea
              name="content"
              id="contentTextarea"
              className="form-control contentTextarea"
              value={formData.content}
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
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default BoardWrite;