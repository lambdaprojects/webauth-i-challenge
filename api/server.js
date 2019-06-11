const express = require("express");
const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router.js");
const session = require("express-session");

const server = express();
server.use(express.json());
const sessionConfig = {
  name: "banana",
  secret: "Fruits are healthy!",
  cookie: {
    httpOnly: true, // prevent access from Javascript
    maxAge: 1000 * 60 * 1,
    secure: false // true means send it only over https
  },
  resave: false,
  saveUninitialized: true
};
server.use(session(sessionConfig));
server.get("/", (req, res) => {
  const user = req.session.user || "Stranger";
  res.send(`Hello ${user.username}!`);
});

server.use("/api/auth", authRouter);
server.use("/api/restricted", userRouter);
module.exports = server;
