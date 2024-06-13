package com.fullstack.semiproject.board.service;

import java.util.List;
import java.util.Optional;

import com.fullstack.semiproject.board.dto.BoardDto;

public interface BoardService {
	
//	public List<BoardDto> findAll();
//    public Optional<BoardDto> findById(int board_no);
//    public void insert(BoardDto post);
//    public void update(BoardDto post);
//    public void delete(int board_no);
	public List<BoardDto> findAll();
	public List<BoardDto> findAllRecruit();
	public List<BoardDto> findAllReview();
    public Optional<BoardDto> findById(int board_no);
    public Optional<BoardDto> findByIdReview(int board_no);
    public List<BoardDto> findByIdRepls(int board_no);
    public void recruitInsert(BoardDto board);
    public void reviewInsert(BoardDto board);
    public void insertRepl(BoardDto board);
    public void recruitUpdate(BoardDto board);
    public void delete(int board_no);
}
