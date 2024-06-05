const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/products",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "http://ec2-54-180-92-94.ap-northeast-2.compute.amazonaws.com:8080",
      changeOrigin: true,
    })
  );
};
