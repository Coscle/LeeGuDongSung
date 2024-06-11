package com.fullstack.semiproject.message.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fullstack.semiproject.message.dto.MessageDto;

@Mapper
public interface MessageMapper {

	public List<MessageDto> findAll();
    public MessageDto findById(int message_no);
    public void insert(MessageDto message);
    public void update(MessageDto message);
    public void delete(int message_no);
    
}
