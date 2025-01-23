const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Rerouting delle richieste che iniziano con /api
    createProxyMiddleware({
      target: 'http://10.1.1.127:8080', // URL del backend principale
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Rimuove il prefisso "/api" prima di inoltrare la richiesta
      },
    })
  );

//   app.use(
//     '/auth', // Rerouting per un microservizio separato
//     createProxyMiddleware({
//       target: 'http://localhost:8081', // URL di un secondo microservizio
//       changeOrigin: true,
//     })
//   );

};
