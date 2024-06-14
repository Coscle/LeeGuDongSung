package com.fullstack.semiproject.user.service;

import java.util.List;
import java.util.Optional;

import com.fullstack.semiproject.user.dto.UserDto;

public interface UserService {

    List<UserDto> findAll();

    Optional<UserDto> findByMemberNo(int member_no);

    UserDto findByMemberId(String member_id);

    void insert(UserDto user);

    void updateSignUp(UserDto user);

    void deleteByMemberNo(int member_no);

    List<UserDto> selectMyinfo(String member_id);

    void updateProfile(UserDto user);

    UserDto selectMember(String member_id, String member_pw);


}