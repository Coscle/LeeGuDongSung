package com.fullstack.semiproject.user.service;

import java.util.List;
import java.util.Optional;

import com.fullstack.semiproject.user.dto.UserDto;

public interface UserService {

	List<UserDto> findAll();

	Optional<UserDto> findByMemberNo(int member_no);
	
	void insert(UserDto user);
	
	void update(UserDto user);

	void deleteByMemberNo(int member_no);

}