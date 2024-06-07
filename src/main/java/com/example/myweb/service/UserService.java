package com.example.myweb.service;

import java.util.List;
import java.util.Optional;

import com.example.myweb.user.UserDTO;

public interface UserService {
    List<UserDTO> findAll();
    Optional<UserDTO> findById(Long id);
    void save(UserDTO user);
    void deleteById(Long id);
}