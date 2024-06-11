import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageDetail from './MessageDetail';
import './messageBoard.css';
import axios from 'axios';

function MessageBoard() {
  const [messageList, setMessageList] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    axios.get("/getMessageList").then((res) => {
      const filteredMessages = res.data.filter(message => message.receiver_no === 1);
      setMessageList(filteredMessages);
    }).catch((error) => {
      console.error('Error fetching message list:', error);
    });
  }, []);

  const selectMessage = (message) => {
    setSelectedMessage(message);
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
                        <input type="text" className="form-control search-bar" placeholder="Search" />
                        <span className="input-group-addon">
                          <button type="button" className="btn btn-primary">검색</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <MessageList messages={messageList} onSelectMessage={selectMessage} />
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
      </div>
    </div>
  );
}

export default MessageBoard;
