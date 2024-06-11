package com.example.myweb.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.*;

import com.example.myweb.user.UserDTO;

@Mapper
public interface UserMapper {
	List<UserDTO> findAll();
	
    Optional<UserDTO> findByMemberNo(int member_no);

    void insert(UserDTO user);

    void update(UserDTO user);

    void delete(int member_no);
}
