import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import './messageBoard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

function MessageBoard() {
  const [messageList, setMessageList] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sweetalert = (title, contents, icon, confirmButtonText) => {
    Swal.fire({
        title: title,
        text: contents,
        icon: icon,
        confirmButtonText: confirmButtonText
        })
  }

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/getMessageList").then((res) => {
      const messages = res.data.filter(message => message.receiver_no === 1);
      setMessageList(messages);
      setFilteredMessages(messages);
    }).catch((error) => {
      console.error('Error fetching message list:', error);
    });
  }, []);

  useEffect(() => {
    const filtered = messageList.filter(message => 
      message.message_content.includes(searchQuery)
    );
    setFilteredMessages(filtered);
  }, [searchQuery, messageList]);

  const selectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = async () => {
    try {
      const newMessage = {
        message_content: "새로보냄2 (나한테)",
        sender_no: 1, // 임시로 설정
        receiver_no: 1, // 임시로 설정
        member_no: 1, // 임시로 설정
        send_date: "2024-06-30"
      };
      const response = await axios.post("/sendMessage", newMessage);
      setMessageList([...messageList, response.data]);
      setNewMessageContent('');

      sweetalert("메세지 전송완료", '','','확인');

    } catch (error) {
      console.error('Error sending message:', error);
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
                        <input 
                          type="text" 
                          className="form-control search-bar" 
                          placeholder="Search" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="input-group-addon">
                          <button 
                            type="button" 
                            className="btn btn-primary"
                          >검색</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <MessageList messages={filteredMessages} onSelectMessage={selectMessage} />
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
            <div className="noMessage">
              함께 하고 싶은 <br/>여행 메이트에게 <br/>메시지를 보내보세요!
            </div>
          )}
        </div>
        <div className="messagecompose">
              <textarea 
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
                placeholder="메시지를 입력하세요..."
              />
              <button onClick={handleSendMessage} >보내기</button>
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;
