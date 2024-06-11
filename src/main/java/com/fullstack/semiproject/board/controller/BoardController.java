package com.fullstack.semiproject.board.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.semiproject.board.dto.BoardDto;
import com.fullstack.semiproject.board.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {

	@Autowired
	private BoardService boardService;
	
	@GetMapping("")
	public List<BoardDto> getAllPost() {
		List<BoardDto> list = boardService.findAll();
		System.out.println(list);
		return boardService.findAll();
	}
	
	@GetMapping("/{board_no}")
	public ResponseEntity<BoardDto> getPostById(@PathVariable int board_no) {
		Optional<BoardDto> post = boardService.findById(board_no);
		return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	
	@PostMapping("")
	public ResponseEntity<BoardDto> createPost(@RequestBody BoardDto post) {
		boardService.insert(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
	}
	
	
    @PutMapping("/{board_no}")
    public ResponseEntity<BoardDto> updateUser(@PathVariable int board_no, @RequestBody BoardDto post) {
    	post.setBoard_no(board_no);
        boardService.update(post);
        return ResponseEntity.ok(post);
    }
    
	@DeleteMapping("/{board_no}")
    public ResponseEntity<Void> deleteUser(@PathVariable int board_no) {
        boardService.delete(board_no);
        return ResponseEntity.noContent().build();
    }
	
}
