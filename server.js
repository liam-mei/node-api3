const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

// Global Middleware
const server = express();
server.use(express.json());
server.use(helmet());
// server.use(morgan('dev'));
// server.use(logger);

// Routing
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
//logger logs to the console the following information about each request: request method, request url, and a timestamp
//this middleware runs on every request made to the API

function logger(req, res, next) {
  // console.log("req obj: ", req);
}

module.exports = server;
