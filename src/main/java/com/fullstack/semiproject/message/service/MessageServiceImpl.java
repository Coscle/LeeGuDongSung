package com.fullstack.semiproject.message.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.semiproject.message.dto.MessageDto;
import com.fullstack.semiproject.message.mapper.MessageMapper;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageMapper messageMapper;
	
	@Override
	public List<MessageDto> findAll() {
		return messageMapper.findAll();
	}

	@Override
	public Optional<MessageDto> findById(int message_no) {
		return Optional.ofNullable(messageMapper.findById(message_no));
	}

	@Override
	public void insert(MessageDto message) {
		messageMapper.insert(message);
	}

	@Override
	public void update(MessageDto message) {
		messageMapper.update(message);
	}

	@Override
	public void delete(int message_no) {
		messageMapper.delete(message_no);
	}

}
