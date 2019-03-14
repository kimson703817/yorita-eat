const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/auth/*', { target: 'http://localhost:5000' }));
  app.use(proxy('/api/eatery/*', { target: 'http://localhost:5000' }));
  app.use(
    proxy('/api/resource/upload/image', { target: 'http://localhost:5000' })
  );
  app.use(proxy('/api/eatery/menu/*', { target: 'http://localhost:5000' }));
};
