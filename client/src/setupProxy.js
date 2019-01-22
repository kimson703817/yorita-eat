const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/auth/twitter', { target: 'http://127.0.0.1:5000' }));
};
