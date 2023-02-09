const app = require("./Server/index");
const express = require("express")
const port = 5555;
const path = require("path");
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: false,
  })
);


app.get('*', (req, res) => {
 
  res.send("hello");
});
app.listen(port,() => {
  console.log(` Backend server is running!  http://localhost:${port}`);
});