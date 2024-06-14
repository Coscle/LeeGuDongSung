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
        //System.out.println(userMapper.findAll());
        return userMapper.findAll();
    }

    @Override
    public Optional<UserDto> findByMemberNo(int member_no) {
        return userMapper.findByMemberNo(member_no);
    }

    @Override
    public UserDto findByMemberId(String member_id) {
        return userMapper.findByMemberId(member_id);
    }

    @Override
    public void insert(UserDto user) {
        userMapper.insert(user);
    }

    @Override
    public void updateSignUp(UserDto user) {
        userMapper.updateSignUp(user);
    }

    @Override
    public void deleteByMemberNo(int member_no) {
        userMapper.deleteByMemberNo(member_no);
    }

    @Override
    public List<UserDto> selectMyinfo(String member_id){
        return userMapper.selectMyinfo(member_id);
    }

    @Override
    public void updateProfile(UserDto user) {
        System.out.println("updateProfile"+user);
        userMapper.updateProfile(user);
    }

    @Override
    public UserDto selectMember(String member_id, String member_pw) {
        UserDto user = userMapper.selectMember(member_id, member_pw);
        if (user != null) {
            return user; // 로그인 성공 시 사용자 정보를 반환
        } else {
            return null; // 로그인 실패 시 null 반환
        }
    }


}