const tempData = [
  {
    CBOARD_NO: 'C1',
    MEMBER_ID: 'user123',
    CBOARD_TAGS: ['여행', '동행'],
    RECERUIT_DONE: false,
    TRIP_START: '2024-07-01',
    TRIP_END: '2024-07-10',
    BOARD_CATEGORY: 1,
    BOARD_NO: 'B1',
    BOARD_TITLE: '여행 동행 게시물 1',
    BOARD_CONTENT: '여행 동행 게시물의 내용이 여기에 들어갑니다. 첫 번째 게시글입니다.',
    BOARD_REPL: '댓글 내용이 여기에 들어갑니다.',
    BOARD_WRITEDAY: '2024-06-08',
    BOARD_VIEWS: 123,
    MEMBER_NICKNAME: '작성자명',
    photo: 'https://via.placeholder.com/150',
    comments: [
      { id: 1, text: '댓글 1', author: '댓글 작성자 1', depth: 0, replies: [] },
      { id: 2, text: '댓글 2', author: '댓글 작성자 2', depth: 0, replies: [
        { id: 1, text: '대댓글 1-1', author: '대댓글 작성자 1-1', depth: 1 },
        { id: 2, text: '대댓글 1-2', author: '대댓글 작성자 1-2', depth: 1 }
      ] }
    ]
  },
  {
    CBOARD_NO: 'C2',
    MEMBER_ID: 'user124',
    CBOARD_TAGS: '캠핑, 등산',
    RECERUIT_DONE: true,
    TRIP_START: '2024-07-02',
    TRIP_END: '2024-07-12',
    BOARD_CATEGORY: 1,
    BOARD_NO: 'B2',
    BOARD_TITLE: '캠핑 동행 구합니다!',
    BOARD_CONTENT: '캠핑을 좋아하는 사람들과 함께 여행을 떠나고 싶습니다. 함께 즐거운 시간 보내요!',
    BOARD_REPL: '댓글 내용이 여기에 들어갑니다.',
    BOARD_WRITEDAY: '2024-06-09',
    BOARD_VIEWS: 345,
    MEMBER_NICKNAME: '캠핑매니아',
    comments: [
      { id: 1, text: '댓글 1', author: '댓글 작성자 1', replies: [] },
      { id: 2, text: '댓글 2', author: '댓글 작성자 2', replies: [] },
      { id: 3, text: '댓글 3', author: '댓글 작성자 3', replies: [] }
    ]
  },
  {
    CBOARD_NO: 'C3',
    MEMBER_ID: 'user125',
    CBOARD_TAGS: '여행, 자전거',
    RECERUIT_DONE: false,
    TRIP_START: '2024-07-03',
    TRIP_END: '2024-07-14',
    BOARD_CATEGORY: 1,
    BOARD_NO: 'B3',
    BOARD_TITLE: '자전거 여행 모임',
    BOARD_CONTENT: '여름이 왔으니 자전거 여행을 떠나보는 건 어떨까요? 함께 멋진 경치를 감상하며 즐거운 시간 보내요!',
    BOARD_REPL: '댓글 내용이 여기에 들어갑니다.',
    BOARD_WRITEDAY: '2024-06-10',
    BOARD_VIEWS: 567,
    MEMBER_NICKNAME: '자전거여행러',
    comments: [
      { id: 1, text: '댓글 1', author: '댓글 작성자 1', replies: [] },
      { id: 2, text: '댓글 2', author: '댓글 작성자 2', replies: [] },
      { id: 3, text: '댓글 3', author: '댓글 작성자 3', replies: [] }
    ]
  },
  {
    CBOARD_NO: 'C4',
    MEMBER_ID: 'user126',
    CBOARD_TAGS: '여행, 해변',
    RECERUIT_DONE: false,
    TRIP_START: '2024-07-04',
    TRIP_END: '2024-07-15',
    BOARD_CATEGORY: 1,
    BOARD_NO: 'B4',
    BOARD_TITLE: '여름에는 해변이지!',
    BOARD_CONTENT: '여름이 왔습니다! 함께 해변으로 떠나요! 시원한 바다와 좋은 음식, 즐거운 친구들과 함께라면 더할 나위 없죠!',
    BOARD_REPL: '댓글 내용이 여기에 들어갑니다.',
    BOARD_WRITEDAY: '2024-06-11',
    BOARD_VIEWS: 789,
    MEMBER_NICKNAME: '바다풍경',
    comments: [
      { id: 1, text: '댓글 1', author: '댓글 작성자 1', replies: [] },
      { id: 2, text: '댓글 2', author: '댓글 작성자 2', replies: [] },
      { id: 3, text: '댓글 3', author: '댓글 작성자 3', replies: [] }
    ]
  },
  {
    CBOARD_NO: 'C5',
    MEMBER_ID: 'user127',
    CBOARD_TAGS: '여행, 산행',
    RECERUIT_DONE: false,
    TRIP_START: '2024-07-05',
    TRIP_END: '2024-07-16',
    BOARD_CATEGORY: 1,
    BOARD_NO: 'B5',
    BOARD_TITLE: '산행을 즐기는 사람 구해요!',
    BOARD_CONTENT: '산행을 좋아하는 사람을 찾습니다. 여름이니 산행이 더욱 즐거울 거에요. 함께 좋은 추억 만들어요!',
    BOARD_REPL: '댓글 내용이 여기에 들어갑니다.',
    BOARD_WRITEDAY: '2024-06-12',
    BOARD_VIEWS: 987,
    MEMBER_NICKNAME: '산행러',
  },
];

export default tempData;