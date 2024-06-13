package com.fullstack.semiproject.board.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.fullstack.semiproject.board.dto.BoardDto;


@Mapper
public interface BoardMapper {

//	public List<BoardDto> findAll();
//    public BoardDto findById(int board_no);
//    public void insert(BoardDto post);
//    public void update(BoardDto post);
//    public void delete(int board_no);
	
	List<BoardDto> findAll();
	List<BoardDto> findAllRecruit();
	List<BoardDto> findAllReview();
	
    Optional<BoardDto> findById(int id);
    Optional<BoardDto> findByIdReview(int id);
    List<BoardDto> findByIdRepls(int id);

    void insert(BoardDto board);
    void recruitInsert(BoardDto board);
    void reviewInsert(BoardDto board);
    void insertRepl(BoardDto board);

    void update(BoardDto board);
    void recruitUpdate(BoardDto board);

    void delete(int board_no);
}
