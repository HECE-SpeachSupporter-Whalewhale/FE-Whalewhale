const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://whalewhale-env-1.eba-c3mypkxm.ap-northeast-2.elasticbeanstalk.com/',
            changeOrigin: true,
        })
    );
};