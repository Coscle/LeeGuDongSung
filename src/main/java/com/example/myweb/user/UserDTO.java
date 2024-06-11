package com.example.myweb.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

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
	
}
