const crypto = require("crypto");

const hasher = async (password, predefinedSalt) => {
  let salt =
    predefinedSalt || crypto.randomBytes(6).toString("hex").slice(0, 12);
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    hashedpassword: value,
  };
};

module.exports = hasher;
