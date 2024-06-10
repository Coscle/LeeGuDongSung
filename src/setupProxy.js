const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
	'/users',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
    }),
  );
};