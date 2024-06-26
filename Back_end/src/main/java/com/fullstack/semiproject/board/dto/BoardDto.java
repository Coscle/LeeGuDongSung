package com.fullstack.semiproject.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardDto {
	/*
	create table board (
			board_no int(10) primary key auto_increment,
			board_title varchar(100) not null,
			board_content text,
			board_category int(1),
			board_writeday varchar(20),
			board_views int(10) default 0,
			boardrepl_cnt int(4) default 0,
			author_no int(8) not null,
			author_my_no int(8),
			board_report int(2) default 0,
			ispost boolean default true,
			foreign key (author_no) references member(member_no),
			foreign key (author_my_no) references myinfo(my_no)
			);
			*/
	private int board_no;
	private String board_title;
	private String board_content;
	private int board_category;
	private String board_writeday;
	private int board_views;
	private int boardrepl_cnt;
	private int author_no;
	private int author_my_no;
	private int board_report;
	private boolean ispost;
	
	// Cboard 속성들 
	private int cboard_no;
	private String cboard_tags;
	private boolean recruit_done;
	private String trip_start;
	private String trip_end;
	
	// 작성자 속성들
	private int member_no;
	private String member_id;
	private String member_nickname;
		
	// 댓글 속성들
	private int boardrepl_no;
	private int replauthor_no;
	private String replauthor_nickname;
	private int boardrepl_group;
	private int boardrepl_repl_seq;
	private String boardrepl_content;
	private String boardrepl_writeday;
	
}
