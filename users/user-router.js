const express = require("express");

const Users = require("./user-model.js");
const restricted = require("../auth/restricted.js");

const router = express.Router();

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
