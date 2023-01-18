const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const hasher = require("../utils/Hasher");
const EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
router.post("/", async (req, res) => {
  const { email } = req.body;
  //Checking if user does not exists
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    const response = {
      responseType: false,
      error: "User does not exists",
    };
    return res.send(response);
  }
  //Generate hash
  const hashResult = await hasher(password, user.salt);
  const { hashedpassword } = hashResult;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  await User.findOneAndUpdate({ email: email }, update)
    .then((response) => {
      res.send({
        responseType: true,
        error: false,
        transaction: response,
      });
    })
    .catch((error) => {
      res.send({
        responseType: false,
        error: err,
      });
    });
});

module.exports = router;
