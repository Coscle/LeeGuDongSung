import React from 'react';

function MessageList({ messages, onSelectMessage }) {
  return (
    <div className="inbox_chat">
      {messages.map((message) => (
        <div 
          key={message.message_no} 
          className="chat_list" 
          onClick={() => onSelectMessage(message)}
        >
          <div className="chat_people">
            <div className="chat_img"> 
            </div>
            <div className="chat_ib">
              <h5>{message.sender_no} <span className="chat_date">{message.board_writeday}</span></h5>
              <p>{message.message_content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
