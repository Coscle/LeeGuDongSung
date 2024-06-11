import React, { useEffect, useReducer, useState } from 'react';
import './comment.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Comment = ({ comments, setComments }) => {
  const {boardNo} = useParams();
  const [commentList, setComment] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  useEffect(()=>{
    axios.get("/findRecruitBoardRepls/"+boardNo).then((res)=>{
      setComment([res.data]);
    });
  },[]);

  const replList = (comment) => {
      return (
      <div key={comment.replauthor_no} className="comment">
        <div className="comment-profile">
          <img src={comment.profilePic} alt="프로필 사진" className="comment-profile-pic" />
          <span className="comment-author">{comment.replauthor_no}</span>
          <p className="comment-text">{comment.boardrepl_content}</p>
          <div className="replies">
            {rereplList(comment)}
            {/* 대댓글 달기 버튼 */}
            {/*!replyingTo && comment.replies.length > 0 && (
              <button className="toggle-reply" onClick={() => handleToggleReply(comment.id)}>🗨답글</button>
            )*/}
          </div>
        </div>
      </div>
      );
  }

  const rereplList = (comment)=>{
    return (
      <>
      {
        console.log(comment)
        //comment.filter(item=>item.boardrepl_repl_seq>0)
      }
      </>
    );
  }

  //const commentList = Array.isArray(comment) ? comment : [];

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

	const handleAddComment = () => {
	  const newId = commentList.length + 1;
	  const newCommentObj = { id: newId, text: newComment, author: '사용자', profilePic: '/profile.jpg', replies: [] };
	  setComments([...commentList, newCommentObj]);
	  setNewComment('');
	};

  const handleToggleReply = (commentId) => {
    setReplyingTo(commentId === replyingTo ? null : commentId);
    setReplyText('@'+commentId+' | '); 
  };

  const handleAddReply = (commentId, depth) => {
    const commentIndex = commentList.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
      const newId = commentList[commentIndex].replies.length + 1;
      const newReply = { id: newId, text: replyText, author: '사용자', profilePic: '/profile.jpg', depth: depth + 1 };
      const updatedComments = [...commentList];
      updatedComments[commentIndex].replies.push(newReply);
      setComments(updatedComments);
      setReplyingTo(null); 
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-input">
        <textarea
          placeholder="댓글을 작성해주세요."
          value={newComment}
          onChange={handleCommentChange}
        ></textarea>
        <button className="comment-button" onClick={handleAddComment}>댓글</button>
      </div>
      <div className="comments">
        { commentList.map(comment => (replList(comment)))}
        { commentList.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-profile">
                <img src={comment.profilePic} alt="프로필 사진" className="comment-profile-pic" />
                <span className="comment-author">{comment.replauthor_no}</span>
                <p className="comment-text">{comment.boardrepl_content}</p>
              {/* 대댓글 토글 버튼 */}
              {
                //<button className="toggle-reply" onClick={() => handleToggleReply(comment.id)}>🗨답글</button>
                <button className="toggle-reply" onClick={() => handleToggleReply(comment.replauthor_nickname)}>🗨답글</button>
              }
              {/* 대댓글 목록 */}
              <div className="replies">
                {/* {comment.map(reply => (
                  <div key={reply.id} className="reply" style={{ marginLeft: `${reply.depth * 40}px` }}>
                    <div className="reply-profile">
                      <img src={reply.profilePic} alt="프로필 사진" className="reply-profile-pic" />
                      <span className="reply-author">{reply.author}</span>
                    </div>
                    <div className="reply-details">
                      <p className="reply-text">{reply.text}</p>
                    </div>
                  </div>
                ))} */}
                {'대댓글'}
                {/* 대댓글 달기 버튼 */}
                {/*!replyingTo && comment.replies.length > 0 && (
                  <button className="toggle-reply" onClick={() => handleToggleReply(comment.id)}>🗨답글</button>
                )*/}
              </div>
              {/* 대댓글 입력란 */}
              {/* {replyingTo === comment.id && (
                <div className="reply-input" style={{ marginLeft: `${comment.depth * 40}px` }}>
                  <textarea
                    placeholder="대댓글을 작성해주세요."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button className="reply-button" onClick={() => handleAddReply(comment.id, comment.depth)}>🗨답글</button>
                </div>
              )} */}
              {
                <div className="reply-input" style={{ marginLeft: `${comment.depth * 40}px` }}>
                  <textarea
                    placeholder={"대댓글을 작성해주세요."}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button className="reply-button" onClick={() => handleAddReply(comment.id, comment.depth)}>🗨답글</button>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;