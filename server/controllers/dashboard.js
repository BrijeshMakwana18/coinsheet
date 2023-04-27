const router = require("express").Router();
const authenticateToken = require("./authorization");
const Transaction = require("../modal/Transaction");
const { response } = require("express");
const transactionCategories = [
  "investment",
  "tax",
  "shopping",
  "food",
  "groceries",
  "entertainment",
  "medical",
  "transfer",
  "recharge",
  "fuel",
  "travel",
  "loan",
  "other",
];

router.post("/", authenticateToken, async (req, res) => {
  const { id } = req.body;
  const monthlyIntervals = [];

  let date = new Date();
  for (let i = 0; i <= date.getMonth(); i++) {
    let firstDay = new Date(date.getFullYear(), date.getMonth() + i - 2, 2);
    console.log(i, date, firstDay, date.getFullYear(), date.getMonth());
    firstDay = new Date(
      firstDay.getTime() + firstDay.getTimezoneOffset() * 60000
    );
    let lastDay = new Date(date.getFullYear(), date.getMonth() + i - 1, 1);
    lastDay = new Date(lastDay.getTime() + lastDay.getTimezoneOffset() * 60000);
    monthlyIntervals.push({
      from: new Date(firstDay.setUTCHours(0, 0, 0, 0)),
      to: new Date(lastDay.setUTCHours(0, 0, 0, 0)),
    });
  }
  try {
    let query = Transaction.find({ userId: id })
      .sort({
        transactionDate: "-1",
      })
      .limit(4);
    let recentTransactions = await query.exec();
    let totalIncome = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { type: "credit" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let totalExpense = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { type: "debit" },
            { transactionCat: { $ne: "tax" } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let totalTax = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { transactionCat: "tax" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let totalInvestment = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { type: "investment" },
            { expenseType: { $ne: "profitloss" } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let totalProfit = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { type: "investment" },
            { transactionCat: "profit" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let totalLoss = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { type: "investment" },
            { transactionCat: "loss" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let transactionsOverview = [];
    let investmentOverview = {
      cat: "investment",
      total: 0,
    };
    for (let i = 0; i < transactionCategories.length; i++) {
      let temp = await Transaction.aggregate([
        {
          $match: {
            $and: [
              {
                userId: id,
              },
              { transactionCat: transactionCategories[i] },
            ],
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$amount",
            },
          },
        },
      ]);
      if (transactionCategories[i] === "investment") {
        investmentOverview.total = temp?.[0]?.sum || 0;
      } else {
        transactionsOverview.push({
          cat: transactionCategories[i],
          total: temp?.[0]?.sum || 0,
        });
      }
    }

    let totalNeeds = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { expenseType: "need" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let totalWants = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { expenseType: "want" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let totalPF = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { investmentType: "pf" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    let totalUSInvestment = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { investmentType: "us" },
          ],
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$amount",
          },
        },
      },
    ]);
    totalIncome = totalIncome?.[0]?.sum - totalTax?.[0]?.sum;
    totalExpense = totalExpense?.[0]?.sum;
    totalUSInvestment = totalUSInvestment?.[0]?.sum;

    // Current Month
    const monthlyStats = [];
    for (let i = 0; i < monthlyIntervals.length; i++) {
      let firstDay = monthlyIntervals[i].from;
      let lastDay = monthlyIntervals[i].to;
      let currentMonthExpenses = await Transaction.aggregate([
        {
          $match: {
            $and: [
              {
                userId: id,
              },
              { type: "debit" },
              { transactionCat: { $ne: "tax" } },
              { transactionDate: { $gte: firstDay } },
              { transactionDate: { $lte: lastDay } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$amount",
            },
          },
        },
      ]);
      let currentMonthNeeds = await Transaction.aggregate([
        {
          $match: {
            $and: [
              {
                userId: id,
              },
              { expenseType: "need" },
              { transactionDate: { $gte: firstDay } },
              { transactionDate: { $lte: lastDay } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$amount",
            },
          },
        },
      ]);

      let currentMonthWants = await Transaction.aggregate([
        {
          $match: {
            $and: [
              {
                userId: id,
              },
              { expenseType: "want" },
              { transactionDate: { $gte: firstDay } },
              { transactionDate: { $lte: lastDay } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$amount",
            },
          },
        },
      ]);
      let monthInvestment = await Transaction.aggregate([
        {
          $match: {
            $and: [
              {
                userId: id,
              },
              { type: "investment" },
              { expenseType: { $ne: "profitloss" } },
              { transactionDate: { $gte: firstDay } },
              { transactionDate: { $lte: lastDay } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$amount",
            },
          },
        },
      ]);
      let currentMonthsCategories = [];
      for (let j = 0; j < transactionCategories.length; j++) {
        let temp = await Transaction.aggregate([
          {
            $match: {
              $and: [
                {
                  userId: id,
                },
                { transactionCat: transactionCategories[j] },
                { transactionDate: { $gte: firstDay } },
                { transactionDate: { $lte: lastDay } },
              ],
            },
          },
          {
            $group: {
              _id: null,
              sum: {
                $sum: "$amount",
              },
            },
          },
        ]);
        currentMonthsCategories.push({
          cat: transactionCategories[j],
          total: parseFloat(temp?.[0]?.sum || 0).toFixed(2),
        });
      }
      const currentMonthStats = {
        expenses: parseFloat(currentMonthExpenses?.[0]?.sum).toFixed(2),
        needs: parseFloat(currentMonthNeeds?.[0]?.sum).toFixed(2),
        wants: parseFloat(currentMonthWants?.[0]?.sum).toFixed(2),
        investments: parseFloat(monthInvestment?.[0]?.sum).toFixed(2),
        currentMonthsCategories: currentMonthsCategories,
      };
      monthlyStats.push(currentMonthStats);
    }

    let response = {
      responseType: monthlyIntervals,
      error: false,
      balance: totalIncome - totalExpense - totalInvestment?.[0]?.sum,
      totalIncome: totalIncome,
      totalExpense: totalExpense || false,
      totalInvestment: totalInvestment?.[0]?.sum - totalLoss?.[0]?.sum || false,
      actualTotalInvestment: totalInvestment?.[0]?.sum || false,
      netPL: (totalProfit?.[0]?.sum || 0) - totalLoss?.[0]?.sum || false,
      totalPF: totalPF?.[0]?.sum,
      investmentOverview: investmentOverview,
      totalUSInvestment: totalUSInvestment,
      totalTax: totalTax?.[0]?.sum,
      transactionCategories: transactionsOverview.sort(
        (a, b) => b.total - a.total
      ),
      recentTransactions: recentTransactions,
      stat: {
        needs: {
          title: "Needs",
          total: totalNeeds?.[0]?.sum || 0,
        },
        wants: {
          title: "Wants",
          total: totalWants?.[0]?.sum || 0,
        },
        investments: {
          title: "Investments",
          total: totalInvestment?.[0]?.sum || 0,
        },
        savings: {
          title: "Savings",
          total: parseFloat(
            totalIncome - totalInvestment?.[0]?.sum - totalExpense
          ).toFixed(2),
        },
      },

      monthlyStats: monthlyStats.reverse(),
    };

    res.send(response);
  } catch (e) {
    console.log(e);
    let error = {
      success: false,
      error: e,
    };

    res.end(error);
  }
});

module.exports = router;
