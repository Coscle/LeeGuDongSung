const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  app.use('/getBoardAll', createProxyMiddleware({
    target: 'http://localhost:8080/board/',
    changeOrigin: true,
    })
  );

  app.use('/getCboardAll', createProxyMiddleware({
    target: 'http://localhost:8080/board/getCboard/',
    changeOrigin: true,
    })
  );


  app.use('/getVboardAll', createProxyMiddleware({
    target: 'http://localhost:8080/board/getVboard/',
    changeOrigin: true,
    })
  );

  app.use('/postRecruitBoard', createProxyMiddleware({
    target: 'http://localhost:8080/board/insertCboard/',
    changeOrigin: true,
    })
  );

  app.use('/findRecruitBoard', createProxyMiddleware({
    target: 'http://localhost:8080/board/',
    changeOrigin: true,
    })
  );

  app.use('/findReviewBoard', createProxyMiddleware({
    target: 'http://localhost:8080/board/review/',
    changeOrigin: true,
    })
  );

  app.use('/findBoardRepls', createProxyMiddleware({
    target: 'http://localhost:8080/board/repls/',
    changeOrigin: true,
    })
  );

  app.use('/findRecruitBoardRepls', createProxyMiddleware({
    target: 'http://localhost:8080/board/repls/',
    changeOrigin: true,
    })
  );

  app.use('/postBoardRepl', createProxyMiddleware({
    target: 'http://localhost:8080/board/insertBoardRepl/',
    changeOrigin: true,
    })
  );

  app.use('/postReviewBoard', createProxyMiddleware({
    target: 'http://localhost:8080/board/insertVboard/',
    changeOrigin: true,
    })
  );

  app.use('/putUpdateBoard', createProxyMiddleware({
    target: 'http://localhost:8080/board/updateBoard/',
    changeOrigin: true,
    })
  );

  app.use('/deleteBoard', createProxyMiddleware({
    target: 'http://localhost:8080/board/deleteBoard/',
    changeOrigin: true,
    })
  );

  app.use('/getMessageList', createProxyMiddleware({
    target: 'http://localhost:8080/message/',
    changeOrigin: true,
    })
  );

  app.use('/getMessageList', createProxyMiddleware({
    target: 'http://localhost:8080/message/',
    changeOrigin: true,
    })
  );

  app.use('/sendMessage', createProxyMiddleware({
    target: 'http://localhost:8080/message/',
    changeOrigin: true,
    })
  );
  

  app.use(
    '/member',
    createProxyMiddleware({
      target: 'http://localhost:8080/member/',
      changeOrigin: true,
    })
  );

    // 회원가입
  app.use(
    '/member',
    createProxyMiddleware({
      target: 'http://localhost:8080/member/',
      changeOrigin: true
    })
  );

  // 회원가입 - TagSelectionPage
  app.use(
    '/signUp',
    createProxyMiddleware({
      target: 'http://localhost:8080/member/id/',
      changeOrigin: true
    })
  );

  // 로그인
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'http://localhost:8080/member/login/',
      changeOrigin: true,
    })
  );

  // 회원정보(내 정보) 받아오기
  app.use(
    '/selectMyinfo',
    createProxyMiddleware({
      target: 'http://localhost:8080/member/id/',
      changeOrigin: true,
    })
  );

  // 회원정보수정
  app.use('/editProfile', createProxyMiddleware({
      target: 'http://localhost:8080/member/editprofile/',
      changeOrigin: true
    })
  );



};