const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const hasher = require("../utils/Hasher");
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  //Generate hash
  const hashResult = await hasher(password);
  const { salt, hashedpassword } = hashResult;
  //Checking if user already exists
  const emailExists = await User.findOne({
    email: email,
  });
  if (emailExists) {
    const response = {
      responseType: false,
      error: "Email is already registered.",
    };
    return res.send(response);
  }
  // New user
  const user = new User({
    username: username,
    email: email,
    salt: salt,
    password: hashedpassword,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        _id: savedUser._id,
      },
      process.env.TOKEN_SECRET
    );
    const response = {
      responseType: true,
      error: false,
      user: {
        username: savedUser.username,
        email: savedUser.email,
        id: savedUser.id,
        token: token,
      },
    };
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
