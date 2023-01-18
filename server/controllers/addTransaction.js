const router = require("express").Router();
const authenticateToken = require("./authorization");
const Transaction = require("../modal/Transaction");
router.post("/", authenticateToken, async (req, res) => {
  const {
    userId,
    amount,
    notes,
    transactionCat,
    type,
    transactionDate,
    expenseType,
    incomeType,
  } = req.body;
  const isUpdateTransaction = req?.body?.id ? true : false;
  const transactionId = req?.body?.id;
  const update = {
    amount: amount,
    notes: notes,
    transactionCat: transactionCat,
    transactionDate: transactionDate,
    expenseType: expenseType,
    type: type,
  };

  if (isUpdateTransaction) {
    await Transaction.findOneAndUpdate({ _id: transactionId }, update)
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
          error: error,
        });
      });
  } else {
    const transaction = new Transaction({
      userId: userId,
      amount: amount,
      notes: notes,
      transactionCat: transactionCat,
      type: type,
      transactionDate: transactionDate,
      expenseType: expenseType,
      incomeType: incomeType,
    });
    await transaction.save((err, response) => {
      if (err) {
        res.send({
          responseType: false,
          error: err,
        });
      } else {
        res.send({
          responseType: true,
          error: false,
          transaction: response,
        });
      }
    });
  }
});

module.exports = router;
