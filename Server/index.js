const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
require("dotenv").config();
const cors = require('cors');

const {PosteRouter}=require("./Router/PosteRouter");

const {UserRouter}=require("./Router/UserRouter");



app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: false, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser())


app.use('/',PosteRouter)
app.use('/',UserRouter)

module.exports = app