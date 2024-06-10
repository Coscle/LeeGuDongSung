import React from 'react';
import './messageList.css'; 

function MessageList({ onSelectMessage }) {
  // 임시 데이터
  const messages = [
    {
      message_no: 1,
      sender_no: 1,
      receiver_no: 2,
      message_content: "첫 번째 메시지입니다.",
      SEND_DATE:"2024-01-25"
    },
    {
      message_no: 2,
      sender_no: 2,
      receiver_no: 1,
      message_content: "두 번째 메시지입니다.",
      SEND_DATE:"2024-01-26"
    },
    {
      message_no: 3,
      sender_no: 1,
      receiver_no: 2,
      message_content: "세 번째 메시지입니다.",
      SEND_DATE:"2024-01-26"
    },
    {
      message_no: 4,
      sender_no: 3,
      receiver_no: 5,
      message_content: "네 번째 메시지입니다.",
      SEND_DATE:"2024-01-28"
    },
        {
      message_no: 5,
      sender_no: 3,
      receiver_no: 1,
      message_content: "네 번째 메시지입니다.",
      SEND_DATE:"2024-01-15"
    }
  ];

  // 대화방 목록 생성
  const chatRooms = {};
  messages.forEach(message => {
    if (message.sender_no === 1 || message.receiver_no === 1) { // sender_no가 1이거나 receiver_no가 1인 경우만 처리
      const roomId = Math.min(message.sender_no, message.receiver_no) + '_' + Math.max(message.sender_no, message.receiver_no);
      if (!chatRooms[roomId]) {
        chatRooms[roomId] = [];
      }
      chatRooms[roomId].push(message);
    }
  });

  const handleRoomClick = (roomId) => {
    // 선택된 대화방의 모든 메시지를 추출
    const selectedRoomMessages = chatRooms[roomId];
    // onSelectMessage 함수를 호출하여 선택된 대화방의 모든 메시지를 전달
    onSelectMessage(selectedRoomMessages);
  };
  
  const handleDeleteRoom = (roomId) => {
    // 해당 대화방 삭제 로직 구현
    // 선택된 roomId에 해당하는 대화방을 삭제하고 UI를 업데이트
    console.log("Delete room:", roomId);
  };

  return (
    <div className="message-list-container">
      {Object.keys(chatRooms).map((roomId, index) => {
        const roomMessages = chatRooms[roomId];
        const lastMessage = roomMessages[roomMessages.length - 1];
        return (
          <div key={index} className="chat-list-box" onClick={() => handleRoomClick(roomId)}>
            <div className="chat-list">
              <div className="chat-people">
                <div className="chat-ib">
                  <h5>{lastMessage.sender_no === 1 ? `${lastMessage.sender_no}님이 보낸 메시지` : `${lastMessage.receiver_no}님이 보낸 메시지`}</h5>
                  <p>{lastMessage.message_content}</p>
                </div>
                <button className="delete-button" onClick={() => handleDeleteRoom(roomId)}>🗑</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MessageList;