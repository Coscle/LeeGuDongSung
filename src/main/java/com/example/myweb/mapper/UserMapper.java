package com.example.myweb.mapper;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.example.myweb.user.UserDTO;

@Mapper
public interface UserMapper {
	List<UserDTO> findAll();
	
    UserDTO findById(Long id);

    void insert(UserDTO user);

    void update(UserDTO user);

    void delete(Long id);
}
