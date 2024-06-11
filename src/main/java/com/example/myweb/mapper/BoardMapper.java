package com.example.myweb.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.example.myweb.board.BoardDTO;

@Mapper
public interface BoardMapper {

	List<BoardDTO> findAll();
	List<BoardDTO> findAllRecruit();
	List<BoardDTO> findAllReview();
	
    Optional<BoardDTO> findById(int id);
    List<BoardDTO> findByIdRepls(int id);

    void insert(BoardDTO board);
    void recruitInsert(BoardDTO board);
    void insertRepl(BoardDTO board);

    void recruitUpdate(BoardDTO board);

    void delete(int board_no);
}