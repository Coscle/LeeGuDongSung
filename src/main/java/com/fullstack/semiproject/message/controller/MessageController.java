package com.fullstack.semiproject.message.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.semiproject.message.dto.MessageDto;
import com.fullstack.semiproject.message.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {

	@Autowired
	private MessageService messageService;
	
	@GetMapping
	public List<MessageDto> getAllMessage() {
		return messageService.findAll();
	}
	
	@GetMapping("/{message_no}")
	public ResponseEntity<MessageDto> getMessageById(@PathVariable int message_no) {
		Optional<MessageDto> message = messageService.findById(message_no);
		return message.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PostMapping("")
	public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto message) {
		messageService.insert(message);
		return ResponseEntity.status(HttpStatus.CREATED).body(message);
	}	
	
	@DeleteMapping("/{message_no}")
	public ResponseEntity<MessageDto> deleteMessage(@PathVariable int message_no) {
		messageService.delete(message_no);
        return ResponseEntity.noContent().build();
	}
	
	
}
