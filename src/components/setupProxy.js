const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/register',
    createProxyMiddleware({
      target: 'http://localhost:3001/register',
      changeOrigin: true,
    })
  );
};
