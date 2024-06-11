import React, { useState } from 'react';
import './messageDetail.css';
import axios from 'axios';

function MessageDetail({ message, onMessageSent }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      // 새 메시지를 서버에 전송
      await axios.post("/api/messages/send", {
        sender_no: 1, // 임시!!!!!!!!로 설정
        receiver_no: message[0].sender_no, // 상대방 번호
        message_content: newMessage
      });

      // 메시지 전송 후 처리할 작업
      onMessageSent();

      // 전송 후 새로운 메시지 받아오기 (데이터를 업데이트할 수도 있습니다)
      // onMessageSent 함수에서 받아온 메시지를 이용하여 업데이트할 수 있습니다.

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

   if (!message || !message.length) {
    return (
      <div className="message-detail-container">
        <p>메세지를 보내 여행 메이트를 찾아보세요</p>
      </div>
    );
  }

  return (
    <div className="message-detail-container">
      <div className="message-list">
        {message.map((message, index) => (
          <div key={index} className="message-box">
            <p className="message-sender">{message.sender_no}가 보낸 메세지</p>
            <p className="message-content">{message.message_content}</p>
            <p className="message-time">{message.sent_time}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <div><input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} /></div>
        <div><button className="send-button" onClick={handleSendMessage}>전송</button></div>
      </div>
    </div>
  );
}

export default MessageDetail;