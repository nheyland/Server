const User = require("../../models/user");
const router = require("express").Router();
const { loginValidation } = require("../../tools/validations/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("", (req, res) => {
  res.send("Login is Post");
});

router.post("", async (req, res) => {
  // Sanitize PostData

  loginValidation(req).error &&
    res.status(400).send(loginValidation(req).error.message);

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  !user && res.status(400).send("Incorrect!");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  !validPass && res.status(400).send("Incorrect! Pass");

  //Inject Data into token
  const data = {
    id: user._id,
    auth: true,
    name: user.name,
    email: user.email,
  };
  // Assign Token
  const token = jwt.sign(data, process.env.TOKEN);
  res.header("auth", token).send("Logged In");
});

module.exports = router;
