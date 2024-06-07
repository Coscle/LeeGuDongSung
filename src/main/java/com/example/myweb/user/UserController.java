package com.example.myweb.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myweb.service.UserService;

@RestController
public class UserController {
	
	private final UserService userService;
	
	@Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
	
	@GetMapping("/getUser")
	public List<UserDTO> getUser(){
		return userService.findAll();
	}
}
