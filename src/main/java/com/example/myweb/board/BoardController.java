package com.example.myweb.board;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myweb.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
	
	private final BoardService boardService;
	
	@Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }
	
	@GetMapping("/")
	public List<BoardDTO> getBoard(){
		return boardService.findAll();
	}
	@GetMapping("/getCboard/")
	public List<BoardDTO> getCboard(){
		return boardService.findAllRecruit();
	}
	@GetMapping("/getVboard/")
	public List<BoardDTO> getVboard(){
		return boardService.findAllReview();
	}
	
	@GetMapping("/{board_no}")
	public Optional<BoardDTO> getBoardfind(@PathVariable int board_no){
		return boardService.findById(board_no);
	}
	@GetMapping("/repls/{board_no}")
	public List<BoardDTO> getBoardfindRepls(@PathVariable int board_no){
		return boardService.findByIdRepls(board_no);
	}
	
	@PostMapping("/insertCboard/")
	public void insertBoard(@RequestBody BoardDTO board) {
		boardService.recruitInsert(board);
	}
	@PostMapping("/insertBoardRepl/")
	public void insertBoardRepl(@RequestBody BoardDTO board) {
		boardService.insertRepl(board);
	}
	
	@PutMapping("/updateBoard/")
	public String updateBoard(@RequestBody BoardDTO board) {
		Optional<BoardDTO> existing = boardService.findById(board.getBoard_no());
		if (existing.isPresent()) {
			board.setBoard_no(board.getBoard_no());
			boardService.recruitUpdate(board);
			return "성공";
		} else {
			return "실패";
		}
	}
	
	@GetMapping("/deleteBoard/{board_no}")
	public String delete(@PathVariable int board_no) {
		Optional<BoardDTO> existing = boardService.findById(board_no);
		if (existing.isPresent()) {
			boardService.delete(board_no);
			return "성공";
		} else {
			return "실패";
		}
	}
}
