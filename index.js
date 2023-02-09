const app = require("./Srver/index");
const express = require("express")
const port = 5555;
const path = require("path");
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './Client/dist')));

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:5173/',
    changeOrigin: false,
  })
);


app.get('/', (req, res) => {
 
  res.send(path.resolve(__dirname, './Client/dist', 'index.html'));
});
app.listen(port,() => {
  console.log(` Backend server is running!  http://localhost:${port}`);
});