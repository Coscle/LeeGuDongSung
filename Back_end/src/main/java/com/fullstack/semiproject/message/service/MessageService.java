package com.fullstack.semiproject.message.service;

import java.util.List;
import java.util.Optional;

import com.fullstack.semiproject.message.dto.MessageDto;

public interface MessageService {

	public List<MessageDto> findAll();
    public Optional<MessageDto> findById(int message_no);
    public void insert(MessageDto message);
    public void update(MessageDto message);
    public void delete(int message_no);
    
}
