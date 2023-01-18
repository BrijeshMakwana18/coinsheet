const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const hasher = require("../utils/Hasher");
router.post("/", async (req, res) => {
  const { id } = req.body;

  try {
    let indianStocks = req.body?.indianStocks
    let currentIndianStocks = await User.findOne({
        id: id
    })
    let portfolio = currentIndianStocks
    currentIndianStocks?.portfolio?.indianStocks.push(indianStocks)
    if(typeof indianStocks === "object"){
        await User.findOneAndUpdate({ _id: id }, currentIndianStocks)
            .then((response) => {
              res.send({
                responseType: true,
                error: false,
                old: portfolio,
                new: response,
              });
            })
            .catch((error) => {
              res.send({
                responseType: false,
                error: err,
              });
            });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
