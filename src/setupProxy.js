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

  app.use('/findRecruitBoardRepls', createProxyMiddleware({
    target: 'http://localhost:8080/board/repls/',
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

};