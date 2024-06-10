package com.fullstack.semiproject.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fullstack.semiproject.board.dto.BoardDto;


@Mapper
public interface BoardMapper {

	public List<BoardDto> findAll();
    public BoardDto findById(int board_no);
    public void insert(BoardDto post);
    public void update(BoardDto post);
    public void delete(int board_no);
}
