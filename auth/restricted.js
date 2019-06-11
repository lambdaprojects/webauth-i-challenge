// const bcrypt = require("bcryptjs");

// const Users = require("../users/user-model.js");

// middleware
module.exports = function restricted(req, res, next) {
  let user = req.session.user;
  console.log("----------USER NAME IS ------------" + user.username);

  if (user.username && user.password) {
    // Users.findBy({ username })
    //   .first()
    //   .then(user => {
    //     if (user && bcrypt.compareSync(password, user.password)) {
    //       next();
    //     } else {
    //       res.status(401).json({ message: "Invalid Credentials" });
    //     }
    //   })
    //   .catch(error => {
    //     res.status(500).json(error);
    //   });
    next();
  } else {
    res.status(400).json({ message: "Please provide credentials" });
  }
};
