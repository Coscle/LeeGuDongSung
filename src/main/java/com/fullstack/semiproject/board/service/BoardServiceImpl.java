package com.fullstack.semiproject.board.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.semiproject.board.dto.BoardDto;
import com.fullstack.semiproject.board.mapper.BoardMapper;


@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	@Override
	public List<BoardDto> findAll() {
		System.out.println(boardMapper.findAll());
		return boardMapper.findAll();
	}

	@Override
	public Optional<BoardDto> findById(int board_no) {
		return Optional.ofNullable(boardMapper.findById(board_no));
	}

	@Override
	public void insert(BoardDto post) {
		boardMapper.insert(post);
	}

	@Override
	public void update(BoardDto post) {
		boardMapper.update(post);
	}

	@Override
	public void delete(int board_no) {
		boardMapper.delete(board_no);
	}

}
