const app = require("./Server/index");
const express = require("express");
const port = app.get("port");
const path = require("path");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./Client/build")));

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send(path.resolve(__dirname, "./Client/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Backend server is running! http://localhost:${port}`);
});
