const express = require("express");
const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router.js");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const server = express();
server.use(express.json());
const sessionConfig = {
  name: "banana",
  secret: "Fruits are healthy!",
  cookie: {
    httpOnly: true, // prevent access from Javascript
    maxAge: 1000 * 60 * 5,
    secure: false // true means send it only over https
  },
  resave: false,
  saveUninitialized: true,
  store: new knexSessionStore({
    knex: require("../data/dbconfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};
server.use(session(sessionConfig));
server.get("/", (req, res) => {
  const user = req.session.user || "Stranger";
  res.send(`Hello ${user.username}!`);
});

server.use("/api/auth", authRouter);
server.use("/api/restricted", userRouter);
module.exports = server;
