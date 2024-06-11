import React from 'react';

function MessageDetail({ message }) {
  return (
    <div className="message-detail">
      <h3>Message from: {message.sender_no}</h3>
      <p>{message.message_content}</p>
      <p>Date: {message.board_writeday}</p>
    </div>
  );
}

export default MessageDetail;
