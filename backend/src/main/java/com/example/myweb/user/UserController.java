package com.example.myweb.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myweb.service.UserService;

@RestController
@RequestMapping("/member")
public class UserController {
	
	private final UserService userService;
	
	@Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
	
	@GetMapping("/")
	public List<UserDTO> getUser(){
		return userService.findAll();
	}
	
	@GetMapping("/{member_no}")
	public Optional<UserDTO> getUserFind(@PathVariable int member_no){
		return userService.findByMemberNo(member_no);
	}
	
	@PostMapping("/insertUser")
	public void insertUser(@RequestBody UserDTO user) {
		System.out.println(user);
		userService.insert(user);
	}
	
	@PutMapping("/{member_no}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable int member_no, @RequestBody UserDTO user) {
        System.out.println("update 호출");
		Optional<UserDTO> existingUser = userService.findByMemberNo(member_no);
        if (existingUser.isPresent()) {
            user.setMember_no(member_no);
            userService.update(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@DeleteMapping("/{member_no}")
    public ResponseEntity<Void> deleteUser(@PathVariable int member_no) {
        userService.delete(member_no);
        return ResponseEntity.noContent().build();
    }
}
