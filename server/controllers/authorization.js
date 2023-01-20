const jwt = require("jsonwebtoken");
let temp = "92272C13D94AFA77597BFF237EB821B6AB195779C594AB38EA103975AA65B76C";
async function authenticateToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];
  if (token == undefined) return res.sendStatus(401);
  // if (token) {
  // jwt.verify(token, process.env.TOKEN_SECRET, (err, response) => {
  if (token !== temp) return res.sendStatus(403);
  next();
  // });
  // }
}

module.exports = authenticateToken;
