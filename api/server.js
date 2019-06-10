const express = require("express");
const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h3>You have reached the default page of API Server</h3>`);
});

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
module.exports = server;
