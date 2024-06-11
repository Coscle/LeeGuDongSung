import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import NewMessage from './NewMessage';
import axios from 'axios';

function ProfileToMessage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessageList();
  }, []);

  const fetchMessageList = async () => {
    try {
      const response = await axios.get("/api/messages");
      setMessages(response.data);
    } catch (error) {
      console.error('메시지 목록을 가져오는 중 오류 발생:', error);
    }
  };

  const selectMessage = (message) => {
    setSelectedMessage(message);
  };

  const sendMessage = async (content) => {
    try {
      // 새로운 메시지 생성
      const newMessage = {
        message_no: messages.length + 1,
        sender_no: 1, // 임시
        receiver_no: 2, // 임시
        message_content: content,
      };

      // 새 메시지를 임시 데이터에 추가합니다.
      setMessages([...messages, newMessage]);

      // 새 메시지를 서버에 전송합니다.
      await axios.post("/api/messages/send", newMessage);

      // 메시지 선택을 초기화합니다.
      setSelectedMessage(null);
    } catch (error) {
      console.error('메시지를 전송하는 중 오류 발생:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 border-right">
         <h2>쪽지함</h2>
          <div className="msg-container">
            <div className="messaging">
              <div className="inbox_msg">
                <div className="inbox_people">
                  <div className="headind_srch">
                    <div className="recent_heading">
                    </div>
                    <div className="srch_bar">
                      <div className="input-group stylish-input-group">
                        <input type="text" className="form-control search-bar" placeholder="검색" />
                        <span className="input-group-addon">
                          <button type="button" className="btn btn-primary">검색</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <MessageList messages={messages} onSelectMessage={selectMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {selectedMessage ? (
            <div className="message-detail-container">
              <MessageDetail message={selectedMessage} />
            </div>
          ) : (
            <NewMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileToMessage;