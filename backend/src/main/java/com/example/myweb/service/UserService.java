package com.example.myweb.service;

import java.util.List;
import java.util.Optional;

import com.example.myweb.user.UserDTO;

public interface UserService {

	List<UserDTO> findAll();

	Optional<UserDTO> findByMemberNo(int member_no);
	
	void insert(UserDTO user);
	
	void update(UserDTO user);

	void delete(int member_no);
}