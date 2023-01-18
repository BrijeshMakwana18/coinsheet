const router = require("express").Router();
const authenticateToken = require("./authorization");
const Transaction = require("../modal/Transaction");
router.post("/", authenticateToken, async (req, res) => {
  const { id } = req.body;
  try {
    let query = Transaction.find({ userId: id }).sort({
      transactionDate: "-1",
    });
    let transactions = await query.exec();

    let response = {
      responseType: true,
      error: false,
      transactions: transactions,
    };

    res.send(response);
  } catch (e) {
    let error = {
      success: false,
      error: e,
    };

    res.end(error);
  }
});

module.exports = router;
