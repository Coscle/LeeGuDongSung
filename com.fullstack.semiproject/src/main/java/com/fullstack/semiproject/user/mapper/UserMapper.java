package com.fullstack.semiproject.user.mapper;

import org.apache.ibatis.annotations.*;

import com.fullstack.semiproject.user.dto.UserDto;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM member")
    List<UserDto> findAll();

    @Select("SELECT * FROM member WHERE member_no = #{member_no}")
    UserDto findByMemberNo(int member_no);

    @Insert("INSERT INTO member(member_name, member_id, member_pw, member_birth, member_gender, member_tel, member_nickname, member_rgday, member_snsurl, member_like, member_dcrt) VALUES(#{member_name}, #{member_id}, #{member_pw}, #{member_birth}, #{member_gender}, #{member_tel}, #{member_nickname}, #{member_rgday}, #{member_snsurl}, #{member_like}, #{member_dcrt})")
    @Options(useGeneratedKeys = true, keyProperty = "member_no")
    void insert(UserDto user);

    @Update("UPDATE member SET member_pw=#{member_pw}, member_tel=#{member_tel}, member_nickname=#{member_nickname}, member_snsurl=#{member_snsurl} WHERE member_no=#{member_no}")
    void update(UserDto user);

    @Delete("DELETE FROM member WHERE member_no = #{member_no}")
    void delete(int member_no);
}
