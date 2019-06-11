const router = require("express").Router();
const bcrypt = require("bcryptjs");

const UserHelper = require("../users/user-model.js");

router.post("/register", async (req, res) => {
  console.log("------WITHIN REGISTER --------");
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    let addUser = await UserHelper.add(user);
    res.status(201).json(addUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  UserHelper.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res
          .status(200)
          .json({ message: `Welcome ${user.username}! Have a cookie.` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
