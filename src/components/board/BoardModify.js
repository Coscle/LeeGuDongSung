import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './boardWrite.css';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function BoardModify({ onSubmit, onCancel, tags, category }) {
  const { boardNo } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    board_title: '',
    board_content: '',
    board_category: category,
    author_no: 1,
    cboard_tags: '',
    recruit_done: false,
    trip_start: '',
    trip_end: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (category === 1) {
          response = await axios.get(`/findRecruitBoard/${boardNo}`);
        } else {
          response = await axios.get(`/findReviewBoard/${boardNo}`);
        }
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching board data:', error);
      }
    };
    fetchData();
  }, [boardNo, category]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.trip_start) > new Date(formData.trip_end)) {
      alert('올바른 날짜를 입력하세요');
      return;
    }

    try {
      if (category === 1) {
        const tmpTag = Object.entries(tags).map(([key, value]) =>
          Object.entries(value).filter(([k, v]) => v === true)
        );
        let stringJson = '';
        for (let i = 0; i < tmpTag.length; i++) {
          if (tmpTag[i].length === 0) {
            alert('태그를 모두 선택하세요');
            return;
          }
        }
        for (let i = 0; i < tmpTag.length; i++) {
          if (i === tmpTag.length - 1) {
            for (let j = 0; j < tmpTag[i].length; j++) {
              stringJson += '' + tmpTag[i][j][0] + '';
            }
          } else {
            for (let j = 0; j < tmpTag[i].length; j++) {
              stringJson += '' + tmpTag[i][j][0] + '/';
            }
          }
        }
        formData.cboard_tags = stringJson;
      }
      
      await axios.put('/putUpdateBoard', formData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error updating board data:', error);
    }
  };

  const handleRecruitmentStatusChange = (status) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      recruit_done: status,
    }));
  };

  return (
    <div className="write-board-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="d-flex align-items-center mb-3">
            {location.pathname === `/recruitboard/${boardNo}/modify` && (
              <>
                <Dropdown className="recruitDoneButton">
                  <Dropdown.Toggle className="custom-dropdown-toggle">
                    {formData.recruit_done ? '구인 완료' : '구인 중'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
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
              </>
            )}
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