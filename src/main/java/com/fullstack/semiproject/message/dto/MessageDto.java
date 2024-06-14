package com.fullstack.semiproject.message.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MessageDto {
	/*
	 message_no int(12) primary key auto_increment,
	message_content varchar(1000) not null,
	send_date varchar(20),
	sender_no int(8),
	receiver_no int(8),
	member_no int(8),
	 */
	private int message_no;
	private String message_content;
	private String send_date;
	private int sender_no;
	private int receiver_no;
	private int member_no;

}
