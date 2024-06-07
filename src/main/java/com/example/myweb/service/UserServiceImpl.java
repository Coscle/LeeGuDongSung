package com.example.myweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myweb.mapper.UserMapper;
import com.example.myweb.user.UserDTO;

@Service
public class UserServiceImpl implements UserService{
	
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
	public Optional<UserDTO> findById(Long id) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public void save(UserDTO user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		
	}

}
