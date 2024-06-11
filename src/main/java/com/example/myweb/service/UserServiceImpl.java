package com.example.myweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myweb.mapper.UserMapper;
import com.example.myweb.user.UserDTO;

@Service
public class UserServiceImpl implements UserService {
	
	private final UserMapper userMapper;
	
	@Autowired
    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

	@Override
	public List<UserDTO> findAll() {
		return userMapper.findAll();
	}

	@Override
	public Optional<UserDTO> findByMemberNo(int member_no) {
		return userMapper.findByMemberNo(member_no);
	}

	@Override
	public void insert(UserDTO user) {
		userMapper.insert(user);
	}

	@Override
	public void update(UserDTO user) {
		userMapper.update(user);
	}
	
	@Override
	public void delete(int member_no) {
		userMapper.delete(member_no);
	}

}
