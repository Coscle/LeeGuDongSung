package com.fullstack.semiproject.user.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.semiproject.user.dto.UserDto;
import com.fullstack.semiproject.user.service.UserService;

@RestController
@RequestMapping("/member")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<UserDto> getMember() {
        return userService.findAll();
    }

    @GetMapping("/{member_no}")
    public ResponseEntity<UserDto> getUserByMemberNo(@PathVariable int member_no) {
        Optional<UserDto> user = userService.findByMemberNo(member_no);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto user) {
        userService.insert(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{member_no}")
    public ResponseEntity<UserDto> updateUser(@PathVariable int member_no, @RequestBody UserDto user) {
        Optional<UserDto> existingUser = userService.findByMemberNo(member_no);
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
        userService.deleteByMemberNo(member_no);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profile/{member_no}")
    public List<UserDto> selectMyinfo(@PathVariable int member_no) {
        return userService.selectMyinfo(member_no);
    }
    
    @PutMapping("/profile/{member_no}")
    public ResponseEntity<UserDto> updateUserProfile(@PathVariable int member_no, @RequestBody UserDto user) {
        Optional<UserDto> existingUser = userService.findByMemberNo(member_no);
        if (existingUser.isPresent()) {
            user.setMember_no(member_no);
            userService.updateProfile(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/login/")
    public ResponseEntity<UserDto> login(@RequestBody UserDto user) {
    	UserDto loggedInUser = userService.selectMember(user.getMember_id(), user.getMember_pw());
        System.out.println(loggedInUser);
        if (loggedInUser != null) {
            System.out.println("Logged in user: " + user.toString());
            return ResponseEntity.ok(loggedInUser); // 로그인 성공 시 사용자 정보를 반환
        } else {
            System.out.println("실패");

            return null; // 로그인 실패 시 null 반환
        }
    }
}