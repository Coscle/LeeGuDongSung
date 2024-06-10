package com.fullstack.semiproject.user.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.semiproject.user.dto.UserDto;
import com.fullstack.semiproject.user.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDto> findAll() {
        return userMapper.findAll();
    }

    @Override
    public Optional<UserDto> findByMemberNo(int member_no) {
        return Optional.ofNullable(userMapper.findByMemberNo(member_no));
    }
    
    @Override
    public void insert(UserDto user) {
    	userMapper.insert(user);
    }
    
    @Override
    public void update(UserDto user) {
    	userMapper.update(user);
    }

    @Override
    public void deleteByMemberNo(int member_no) {
        userMapper.delete(member_no);
    }
}