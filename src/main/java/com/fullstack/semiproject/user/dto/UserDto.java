package com.fullstack.semiproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
public class UserDto {
	private int member_no;
	private String member_name;
	private String member_id;
	private String member_pw;
	private String member_birth;
	private int member_gender;
	private String member_tel;
	private String member_nickname;
	private String member_rgday;
	private String member_snsurl;
	private int member_like;
	private String member_dcrt;
	private int my_no;
	private String my_tags;
	private int my_like;

	
	public UserDto() {
		//System.out.println("디폴트 생성자 userDto");
	}
		
	public UserDto(int member_no, String member_name, String member_id, String member_pw, String member_birth,
			int member_gender, String member_tel, String member_nickname, String member_rgday, String member_snsurl,
			int member_like, String member_dcrt, int my_no, String my_tags, int my_like) {
		
		//System.out.println("생성자 오버로딩  userDto");
		this.member_no = member_no;
		this.member_name = member_name;
		this.member_id = member_id;
		this.member_pw = member_pw;
		this.member_birth = member_birth;
		this.member_gender = member_gender;
		this.member_tel = member_tel;
		this.member_nickname = member_nickname;
		this.member_rgday = member_rgday;
		this.member_snsurl = member_snsurl;
		this.member_like = member_like;
		this.member_dcrt = member_dcrt;
		this.my_no = my_no;
		this.my_tags = my_tags;
		this.my_like = my_like;
	}
	
	
}
