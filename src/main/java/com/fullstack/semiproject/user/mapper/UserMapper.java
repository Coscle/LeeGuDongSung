package com.fullstack.semiproject.user.mapper;

import org.apache.ibatis.annotations.*;

import com.fullstack.semiproject.user.dto.UserDto;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {
	
    List<UserDto> findAll();

    UserDto findByMemberNo(int member_no);

    void insert(UserDto user);

    void update(UserDto user);

    void deleteByMemberNo(int member_no);

    List<UserDto> selectMyinfo(int member_no);
        
    UserDto selectMember(String member_id, String member_pw);
    
    void updateProfile(UserDto user);

    
}
