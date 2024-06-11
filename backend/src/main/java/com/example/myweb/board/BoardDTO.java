package com.example.myweb.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDTO {
	
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
