import React, { useState } from 'react';
import axios from 'axios';
import './messageDetail.css';

function NewMessage({ receiverId }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      // 새 메시지를 서버에 전송
      await axios.post("/api/messages/send", {
        sender_no: 1, // 임시!!!!!!!!로 설정
        receiver_no: receiverId, // 수신자 ID
        message_content: newMessage
      });

      // 메시지 전송 후 처리할 작업
      // 전송 후 새로운 메시지를 받아오는 작업을 추가

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-detail-container">
      <div className="message-list">
        <div className="message-box">
          <p className="message-content">{receiverId}님께 메시지를 보내 여행을 함께하세요!</p>
        </div>
      </div>
      <div className="message-input">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className="send-button" onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
}

export default NewMessage;