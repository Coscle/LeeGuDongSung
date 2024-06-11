--외래키 굳이 쓰는이유
--참조하는 테이블의 데이터가 바뀌면 참조중인 데이터도 바꾸거나 막기 위해 사용.
--예를 들어 다른 테이블의 테이터를 참조한 외래키인 데이터를 추가할때,
--참조하는 테이블의 데이터가 존재하지 않으면
--데이터 삽입에 위배 됨. 즉 추가가 되지 않음. (일관성, 무결성, 정합성유지)
--근데 굳이 쓸필요 없다면 안써도됨. 쓴다면 굳이?? 라는 느낌이강한듯.
--오히려 귀찮아져서 잘 안쓰는듯, 나도 동감하는 부분...
--만약 사용한다면, member_no를 외래키로 가져오고, 그 member_no를 가진 한명이 탈퇴했을때,
--그 한명이 작성했던 모든글이 삭제되는 기능으로 하면 될듯.
--또는 가입안된 유저가 글을 작성하지 못하게.
--반대로 기본키는 무조건 포함해야함. 특히 int형으로. int로 설정해야
--처리가 빠르다고 함.
--참고 : https://blog.naver.com/sssang97/222313734688
--https://juns-life.tistory.com/entry/DB-%EC%99%B8%EB%9E%98%ED%82%A4-foreign-key-%EC%82%AC%EC%9A%A9%EC%9D%84-%ED%95%98%EB%8A%94%EA%B2%8C-%EC%A2%8B%EC%9D%84%EA%B9%8C
--https://cherrue.github.io/database/%EC%99%B8%EB%9E%98%ED%82%A4%EB%A5%BC-%EC%95%88%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0/

--그냥 my_no 랑 member_no를 하나로 통일하면 안되나? 데이터베이스 짤때 어려운 느낌,
--하나의 계정당 어차피 프로필은 하나일텐데, 멀티프로필 기능이 아니면 왜 두는지 모르겟음..
--뒤에 숫자는 자릿수 int(8)이면 8자리
--글자는 varchar2(10)이면, 한글은 5자, 영어는 10자

--멤버--
create table member (
member_no int(8) primary key auto_increment,
member_name varchar2(1000) not null,
member_id varchar2(20) unique not null,		--id 20글자
member_pw varchar2(20) not null,			--pw 20글자
member_birth varchar2(10) not null,			--생년월일 20240101 총 8글자.
member_gender int(1) not null,
member_tel varchar2(15) unique not null,
member_nickname varchar2(20) unique not null,
member_rgday varchar2(20) default curdate(),	--시간까지 추가해서 더 길게 202401011230 , 2024년 1월 1일 12시 30분
member_snsurl varchar(50),
member_like int(10),
member_dcrt varchar(200)
);

--게시글--
create table boardtest (
board_no int(10) primary key auto_increment,
board_title varchar2(100) not null,
board_content varchar2(4000),
board_category varchar2(4000),
board_writeday varchar2(20) default curdate(),
board_views int(10) default 0,
boardrepl_cnt int(4) default 0,
author_no int(8) unique not null,
author_my_no int(8),
board_report int(2),
ispost boolean,
foreign key (author_no) references member(member_no),
foreign key (author_my_no) references myinfo(my_no)
);

--구인게시글--
create table recruitboard (
cboard_no int(10) primary key auto_increment,
cboard_tags varchar2(1000),
recruit_done boolean default false,
trip_start varchar2(10) default 미정,
trip_end varchar2(10) default 미정,
board_category int(1) default 1,
board_no int(10),
foreign key (board_no) references board(board_no) on delete cascade
);

--리뷰게시글--
create table reviewboard (
vboard_no int(10) primary key auto_increment,
board_category int(1) default 2,
board_no int(10),
foreign key (board_no) references board(board_no) on delete cascade
);

--멤버정보--
create table myinfo (
my_no int(8) primary key auto_increment,
member_no int(8) unique not null,
my_tags varchar(1000),
my_like int(8),
foreign key (member_no) references member(member_no) on delete cascade
);

--댓글--
create table boardrepls (
boardrepl_no int(12) primary key auto_increment,
board_no int(10),
boardrepl_content varchar2(100) not null,
boardrepl_isrply boolean default false,
boardrepl_writeday varchar2(20),
replauthor_no int(8) unique not null
replauthor_my_no int(8),
foreign key (board_no) references board(board_no) on delete cascade,
foreign key (replauthor_no) references member(member_no) on delete cascade,
foreign key (replauthor_my_no) references myinfo(my_no) on delete cascade
);

--쪽지--
create table message (
message_no int(12) primary key auto_increment,
message_content varchar2(1000) not null,
send_date varchar2(20) default curdate(),	--이부분 관건.. 프론트에서, 날짜를 기준으로 쪽지 섹션을 나눌지 그냥 할지..
sender int(8),
reciever int(8),
member_no int(8) not null,	--비회원은 메시지 못보내게.
foreign key (sender) references member(member_no), 	--sender랑 reciever의 닉네임은 member테이블에서 조인해서 받아올거라면, casecade 안넣어도 될듯
foreign key (receiver) references member(member_no)
);

--차단한 목록--
create table myblock (
myblock_no int(10) primary key auto_increment,
my_no int(8),
member_no int(8) not null, 
foreign key (member_no) references member(member_no) on delete cascade
);

--스크랩--
create table myadd (
my_no int(8) primary key,
board_no int(10),
foreign key (board_no) references board(board_no) on delete cascade
);

--어드민--
create table admin (
admin_no int(2) primary key auto_increment,
admin_name varchar2(1000) not null,
admin_id varchar2(20) unique not null,
admin_pw varchar2(20) not null,
admin_rgday varchar2(12) default curdate()	--어드민 가입 날짜는 필요한가?
);