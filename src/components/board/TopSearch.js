import React from 'react';
import searchBtn from '../../images/searchBtn.png';

function TopSearch({ value, onChange }) {
  return (
    <div className="searchContainer">
      <form>
        <div className="topSearch">
          <p>여행 메이트를 찾아보세요</p>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className="topSearchBar"
            placeholder="검색어를 입력하세요"
            value={value}
            onChange={onChange}
          />
          <button type="submit" className="searchBtn">
            <img className="searchBtnIcon" src={searchBtn} alt="searchBtn" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default TopSearch;