const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
	'/users',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
    }),
  );

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
  app.use(
    '/member',
    createProxyMiddleware({
      target: 'http://localhost:8080/member/',
      changeOrigin: true,
    })
  );
  
};