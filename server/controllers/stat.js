const router = require("express").Router();
const Transaction = require("../modal/Transaction");
const authenticateToken = require("./authorization");
const path = require("path");

router.post("/", authenticateToken, async (req, res) => {
  const { id } = req.body;
  let query = Transaction.find({ userId: id });
  query.exec((err, response) => {
    if (err) {
      res.send(err);
    } else {
      const creditTransactions = response.filter(
        (item) => item.type == "credit"
      );
      const totalIncome = creditTransactions.reduce(
        (prev, item) => prev + item.amount,
        0
      );
      const debitTransactions = response.filter((item) => item.type == "debit");
      const needTransactions = debitTransactions.filter(
        (item) => item.expenseType == "need"
      );
      const needsTotal = needTransactions
        .reduce((prev, item) => prev + item.amount, 0)
        .toFixed(2);

      const wantTransactions = debitTransactions.filter(
        (item) => item.expenseType == "want"
      );
      const wantesTotal = wantTransactions
        .reduce((prev, item) => prev + item.amount, 0)
        .toFixed(2);

      const investmentTransactions = debitTransactions.filter(
        (item) => item.expenseType == "investment"
      );
      const investmentTotal = investmentTransactions
        .reduce((prev, item) => prev + item.amount, 0)
        .toFixed(2);
      let needStat = {
        title: "Needs",
        total: needsTotal,
        numberOfTransactions: needTransactions.length,
        percentage: ((100 * needsTotal) / totalIncome).toFixed(2),
      };
      let wantStat = {
        title: "Wants",
        total: wantesTotal,
        numberOfTransactions: wantTransactions.length,
        percentage: ((100 * wantesTotal) / totalIncome).toFixed(2),
      };
      let investmentStat = {
        title: "Investments",
        total: investmentTotal,
        numberOfTransactions: investmentTransactions.length,
        percentage: ((100 * investmentTotal) / totalIncome).toFixed(2),
      };
      const totalSavings =
        totalIncome - needsTotal - wantesTotal - investmentTotal;
      let savingsStat = {
        title: "Savings",
        total: totalSavings,
        numberOfTransactions:
          response.length -
          investmentTransactions.length -
          needTransactions.length -
          wantTransactions.length,
        percentage: ((100 * totalSavings) / totalIncome).toFixed(2),
      };
      let stat = [needStat, wantStat, investmentStat, savingsStat];
      if (totalIncome == 0) {
        res.send({
          responseType: false,
          error:
            "Oops! Seems like you have spent more than you have. If not then please select valid dates for custom statistics. This could happen when you have no income as per our records during selected period.",
        });
      } else {
        res.send({
          responseType: true,
          error: false,
          totalIncome: totalIncome,
          stat: stat,
        });
      }
    }
  });
});

module.exports = router;
