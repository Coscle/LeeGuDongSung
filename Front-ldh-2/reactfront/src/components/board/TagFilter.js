import React from 'react';
import './sideFilter.css';

function TagFilter({ title, items, activeItems, onItemClick }) {
  return (
    <div className="filterGroup">
      <h3>{title}</h3>
      {items.map(item => (
        <button
          key={item}
          onClick={() => onItemClick(item)}
          className={`boardTag ${activeItems.includes(item) ? 'active' : ''}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;