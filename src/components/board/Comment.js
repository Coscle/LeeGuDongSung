import React, { useEffect, useState } from 'react';
import './comment.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Comment = ({ comments, setComments }) => {
  const {boardNo} = useParams();
  const [commentList, setComment] = useState([]);
  const [tempList, setTemp] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  useEffect(()=>{
    axios.get("/findBoardRepls/"+boardNo).then((res)=>{
      setTemp(res.data);
    });
  },[]);

  useEffect(()=>{
    if (commentList.length < tempList.length){
      tempList.map((item)=>{
        setComment(commentList=>[...commentList,{
          boardrepl_no : item.boardrepl_no,
          boardrepl_content : item.boardrepl_content,
          replauthor_no : item.replauthor_no,
          replauthor_nickname : item.replauthor_nickname,
          boardrepl_group : item.boardrepl_group,
          boardrepl_repl_seq : item.boardrepl_repl_seq,
          boardrepl_writeday : item.boardrepl_writeday
        }])
      });
    }
  },[tempList]);

  //댓글
  const replList = (comment, idx) => {
    if (comment.boardrepl_repl_seq === 0){
      return (
      <div key={comment.replauthor_no} className="comment">
        <div className="comment-profile">
          <img src={comment.profilePic} alt="프로필 사진" className="comment-profile-pic" />
          <span className="comment-author">{comment.replauthor_nickname}</span>
          <p className="comment-text">{comment.boardrepl_content}</p>
          <div className="replies">
            {rereplList(commentList[idx].boardrepl_group)}
            {/* 대댓글 달기 버튼 */}
            {commentList.length > 0 && (
              <button className="toggle-reply" onClick={() => handleToggleReply(comment.boardrepl_no)}>🗨답글</button>
            )}
            
            {/* 대댓글 입력란 */}
            {
              replyingTo === comment.boardrepl_no && (
                <div className="reply-input" style={{ marginLeft: `${comment.boardrepl_repl_seq * 40}px` }}>
                  <textarea
                    placeholder="대댓글을 작성해주세요."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button className="reply-button" onClick={() => handleAddReply(comment.replauthor_no, comment.boardrepl_group)}>🗨답글</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
      );
    }
  }

  //대댓글
  const rereplList = (replGroup)=>{
    const result = commentList.filter((rerepls)=>(
      rerepls.boardrepl_group === replGroup && rerepls.boardrepl_repl_seq > 0
    ));
    return (
      <>
      {
        result.map(reply => (
          <div key={reply.id} className="reply" style={{ marginLeft: `${reply.boardrepl_repl_seq * 40}px` }}>
            <div className="reply-profile">
              <img src={reply.profilePic} alt="프로필 사진" className="reply-profile-pic" />
              <span className="reply-author">{reply.replauthor_nickname}|{reply.boardrepl_repl_seq}</span>
            </div>
            <div className="reply-details">
              <p className="reply-text">{reply.boardrepl_writeday} | {reply.boardrepl_content}</p>
            </div>
          </div>
        ))
      }
      </>
    );
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
	  const newGroup = commentList.length? commentList[commentList.length-1].boardrepl_group : 0;
	  const newCommentObj = {
      replauthor_no: 1,
      boardrepl_content: newComment,
      replauthor_nickname: '홍시',
      profilePic: '/profile.jpg',
      boardrepl_group: newGroup+1,
      boardrepl_repl_seq: 0,
      board_no : boardNo
    };
    console.log(newCommentObj)
    axios.post("/postBoardRepl",newCommentObj);
    window.location.reload();
	  setNewComment('');
	};

  const handleToggleReply = (commentId) => {
    setReplyingTo(commentId === replyingTo ? null : commentId);
    setReplyText('@'+commentId+' | '); 
  };

  const handleAddReply = (commentId, group) => {
    const seq = commentList.filter((rerepls)=>(rerepls.boardrepl_group===group));
    const newCommentObj = {
      replauthor_no: 1,
      boardrepl_content: replyText,
      replauthor_nickname: '홍시',
      profilePic: '/profile.jpg',
      boardrepl_group: group,
      boardrepl_repl_seq: seq.length,
      board_no : boardNo
    };
    console.log(newCommentObj);
    axios.post("/postBoardRepl", newCommentObj);
    window.location.reload();
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
        { commentList.map((comment, index) => (replList(comment, index)))}
      </div>
    </div>
  );
};

export default Comment;