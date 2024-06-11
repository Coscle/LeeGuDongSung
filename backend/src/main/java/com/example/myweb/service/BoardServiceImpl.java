package com.example.myweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myweb.board.BoardDTO;
import com.example.myweb.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	private final BoardMapper boardMapper;
	
	@Autowired
    public BoardServiceImpl(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }
	
	@Override
	public List<BoardDTO> findAll() {
		return boardMapper.findAll();
	}
	@Override
	public List<BoardDTO> findAllRecruit() {
		return boardMapper.findAllRecruit();
	}
	@Override
	public List<BoardDTO> findAllReview() {
		return boardMapper.findAllReview();
	}

	
	
	@Override
	public Optional<BoardDTO> findById(int board_no) {
		return boardMapper.findById(board_no);
	}
	@Override
	public Optional<BoardDTO> findByIdRepls(int board_no) {
		return boardMapper.findByIdRepls(board_no);
	}

	
	
	@Override
	public void recruitInsert(BoardDTO board) {
		boardMapper.insert(board);
		boardMapper.recruitInsert(board);
	}

	
	
	@Override
	public void update(BoardDTO board) {
		boardMapper.update(board);
	}

	
	
	@Override
	public void delete(int board_no) {
		boardMapper.delete(board_no);
	}

}
