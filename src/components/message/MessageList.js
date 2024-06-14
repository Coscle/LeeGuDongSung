import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext';
import './messageList.css';

function MessageList({ messages, onSelectMessage }) {
  const {user} = useContext(AuthContext);
  console.log(user);
  const tmpMassages = [{
    message_no : 1,
    sender : '라이언',
    receiver : '이구동성',
    send_date : '2024-06-10',
    message_content : '글보고 쪽지 드렸어요~ㅎㅎ'
  },{
    message_no : 2,
    sender : '이구동성',
    receiver : '라이언',
    send_date : '2024-06-10',
    message_content : '아 네~ 같이가실래요?'
  },{
    message_no : 3,
    sender : '라이언',
    receiver : '이구동성',
    send_date : '2024-06-10',
    message_content : '좋아요, 언제 만나실래요?'
  },{
    message_no : 4,
    sender : '프로도',
    receiver : '이구동성',
    send_date : '2024-06-10',
    message_content : '안녕하세요! 내일 같이 가실래요?'
  },{
    message_no : 5,
    sender : '이구동성 ',
    receiver : '프로도',
    send_date : '2024-06-10',
    message_content : '넵 잠시만여~!'
  }];
  tmpMassages.reverse();
  return (
    <div className="inbox_chat">
      {tmpMassages?.map((message) => (
        <div 
          key={message.message_no} 
          className="chat_list" 
          onClick={() => onSelectMessage(message)}
        >
          <div className="chat_people">
            <div className="chat_img"> 
            </div>
            <div className="chat_ib">
              {/* <h5>{message.sender_no} <span className="chat_date">{message.send_date}</span></h5>
              <p>{message.message_content}</p> */}
                <div class="chat-container">
                <span class="chat-sender">{message.sender}   </span>
                <p class="message-content">{message.message_content}</p>
                <span className="chat-date">{message.send_date}</span>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;