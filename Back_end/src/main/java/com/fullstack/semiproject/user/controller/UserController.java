package com.fullstack.semiproject.user.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    
    // 목록 다 받기
    @GetMapping("/")
    public List<UserDto> getAllUsers() {
        return userService.findAll();
    }

    // 사용자 생성(가입)
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto user) {
        userService.insert(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    // 사용자 생성(가입)+
    @PutMapping("/id/{member_id}")
    public ResponseEntity<UserDto> update(@PathVariable String member_id, @RequestBody UserDto user) {
        userService.updateSignUp(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    // member_no로 조회
    @GetMapping("/no/{member_no}")
    public ResponseEntity<UserDto> getUserByMemberNo(@PathVariable int member_no) {
        Optional<UserDto> user = userService.findByMemberNo(member_no);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // member_no로 수정
    @PutMapping("/no/{member_no}")
    public ResponseEntity<UserDto> updateUser(@PathVariable int member_no, @RequestBody UserDto user) {
        Optional<UserDto> existingUser = userService.findByMemberNo(member_no);
        if (existingUser.isPresent()) {
            user.setMember_no(member_no);
            userService.updateSignUp(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // member_id로 myinfo까지 합쳐서 조회 후 정보 업데이트
    @GetMapping("/id/{member_id}")
    public ResponseEntity<UserDto> getUserByMemberId(@PathVariable String member_id) {
        UserDto user = userService.findByMemberId(member_id);
        return ResponseEntity.ok(user);
    }
        
    // member_no로 회원삭제
    @DeleteMapping("/no/{member_no}")
    public ResponseEntity<Void> deleteUser(@PathVariable int member_no) {
        userService.deleteByMemberNo(member_no);
        return ResponseEntity.noContent().build();
    }
    
    // member_id로 회원정보 받아오기
    @GetMapping("/profile/id/{member_id}")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable String member_id) {
        UserDto user = userService.findByMemberId(member_id);
        return ResponseEntity.ok(user);
    }
    
    // member_id로 회원정보 수정
    @PostMapping("/editprofile/")
    public void updateUserProfile( @RequestBody UserDto user) {
       System.out.println(user);
        UserDto existingUser = userService.findByMemberId(user.getMember_id());
        System.out.println("existinguser>>>>" + existingUser);
        if (existingUser != null) {
            userService.updateProfile(existingUser);
        } else {
        	System.out.println("실패");
            //return ResponseEntity.notFound().build();
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