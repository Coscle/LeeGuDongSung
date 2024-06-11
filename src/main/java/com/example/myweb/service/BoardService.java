package com.example.myweb.service;

import java.util.List;
import java.util.Optional;

import com.example.myweb.board.BoardDTO;

public interface BoardService {
	public List<BoardDTO> findAll();
	public List<BoardDTO> findAllRecruit();
	public List<BoardDTO> findAllReview();
    public Optional<BoardDTO> findById(int board_no);
    public List<BoardDTO> findByIdRepls(int board_no);
    public void recruitInsert(BoardDTO board);
    public void insertRepl(BoardDTO board);
    public void recruitUpdate(BoardDTO board);
    public void delete(int board_no);
}
