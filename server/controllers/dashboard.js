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

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

router.post("/", authenticateToken, async (req, res) => {
  const { id } = req.body;
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
    let totalCashbacks = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              userId: id,
            },
            { type: "credit" },
            { incomeType: "cashbackRewards" },
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
    let currentMonthsCategories = [];
    for (let i = 0; i < transactionCategories.length; i++) {
      let temp = await Transaction.aggregate([
        {
          $match: {
            $and: [
              {
                userId: id,
              },
              { transactionCat: transactionCategories[i] },
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
        cat: transactionCategories[i],
        total: temp?.[0]?.sum || 0,
      });
    }
    const currentMonthStats = {
      expenses: currentMonthExpenses?.[0]?.sum,
      needs: currentMonthNeeds?.[0]?.sum,
      wants: currentMonthWants?.[0]?.sum,
      currentMonthsCategories: currentMonthsCategories,
    };

    let response = {
      responseType: true,
      error: false,
      balance: totalIncome - totalExpense - totalInvestment?.[0]?.sum,
      totalIncome: totalIncome,
      totalExpense: totalExpense || false,
      totalInvestment: totalInvestment?.[0]?.sum || false,
      totalCashbacks: totalCashbacks?.[0]?.sum || false,
      totalPF: totalPF?.[0]?.sum,
      investmentOverview: investmentOverview,
      totalUSInvestment: totalUSInvestment,
      totalTax: totalTax?.[0]?.sum,
      transactionCategories: transactionsOverview.sort(
        (a, b) => b.total - a.total
      ),
      recentTransactions: recentTransactions,
      stat: [
        {
          title: "Needs",
          total: totalNeeds?.[0]?.sum || 0,
        },
        {
          title: "Wants",
          total: totalWants?.[0]?.sum || 0,
        },
        {
          title: "Investments",
          total: totalInvestment?.[0]?.sum || 0,
        },
        {
          title: "Savings",
          total: parseFloat(
            totalIncome - totalInvestment?.[0]?.sum - totalExpense
          ).toFixed(2),
        },
      ],
      currentMonthStats: currentMonthStats,
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
