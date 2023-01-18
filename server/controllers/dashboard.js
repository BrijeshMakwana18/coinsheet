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
          total:
            
                  parseFloat(totalIncome -
                  totalInvestment?.[0]?.sum-
                  totalExpense).toFixed(2)
        },
      ],
    };

    res.send(response);
  } catch (e) {
    let error = {
      success: false,
      error: e,
    };

    res.end(error);
  }

  // query.exec((err, response) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     const allTransactions = response;
  //     const creditTransactions = response.filter(
  //       (item) => item.type == "credit"
  //     );
  //     const debitTransactions = response.filter((item) => item.type == "debit");
  //     const totalIncome = creditTransactions.reduce(
  //       (acc, item) => acc + item.amount,
  //       0
  //     );
  //     const totalExpense = debitTransactions.reduce(
  //       (acc, item) => acc + item.amount,
  //       0
  //     );
  //     //Stats Start
  //     const needTransactions = debitTransactions.filter(
  //       (item) => item.expenseType == "need"
  //     );
  //     const needsTotal = needTransactions
  //       .reduce((prev, item) => prev + item.amount, 0)
  //       .toFixed(2);

  //     const wantTransactions = debitTransactions.filter(
  //       (item) => item.expenseType == "want"
  //     );
  //     const wantesTotal = wantTransactions
  //       .reduce((prev, item) => prev + item.amount, 0)
  //       .toFixed(2);

  //     const investmentStatTransactions = debitTransactions.filter(
  //       (item) => item.expenseType == "investment"
  //     );
  //     const investmentTotal = investmentStatTransactions
  //       .reduce((prev, item) => prev + item.amount, 0)
  //       .toFixed(2);

  //     let needStat = {
  //       title: "Needs",
  //       total: needsTotal,
  //       numberOfTransactions: needTransactions.length,
  //       percentage: ((100 * needsTotal) / totalIncome).toFixed(2),
  //     };
  //     let wantStat = {
  //       title: "Wants",
  //       total: wantesTotal,
  //       numberOfTransactions: wantTransactions.length,
  //       percentage: ((100 * wantesTotal) / totalIncome).toFixed(2),
  //     };
  //     let investmentStat = {
  //       title: "Investments",
  //       total: investmentTotal,
  //       numberOfTransactions: investmentStatTransactions.length,
  //       percentage: ((100 * investmentTotal) / totalIncome).toFixed(2),
  //     };
  //     const totalSavings =
  //       totalIncome - needsTotal - wantesTotal - investmentTotal;
  //     let savingsStat = {
  //       title: "Savings",
  //       total: totalSavings,
  //       numberOfTransactions:
  //         response.length -
  //         investmentStatTransactions.length -
  //         needTransactions.length -
  //         wantTransactions.length,
  //       percentage: ((100 * totalSavings) / totalIncome).toFixed(2),
  //     };
  //     let statData = [needStat, wantStat, investmentStat, savingsStat];
  //     let stat = {};
  //     if (totalIncome == 0) {
  //       stat = {
  //         responseType: false,
  //         error:
  //           "Oops! Seems like you have spent more than you have. If not then please select valid dates for custom statistics. This could happen when you have no income as per our records during selected period.",
  //       };
  //     } else {
  //       stat = {
  //         responseType: true,
  //         error: false,
  //         totalIncome: totalIncome,
  //         stat: statData,
  //       };
  //     }
  //     //Stats End

  //     let foodTransactions = { cat: "food", total: 0, transactions: [] };
  //     let rechargeTransactions = {
  //       cat: "recharge",
  //       total: 0,
  //       transactions: [],
  //     };
  //     let transferTransactions = {
  //       cat: "transfer",
  //       total: 0,
  //       transactions: [],
  //     };
  //     let entertainmentTransactions = {
  //       cat: "entertainment",
  //       total: 0,
  //       transactions: [],
  //     };
  //     let fuelTransactions = { cat: "fuel", total: 0, transactions: [] };
  //     let groceriesTransactions = {
  //       cat: "groceries",
  //       total: 0,
  //       transactions: [],
  //     };
  //     let medicalTransactions = { cat: "medical", total: 0, transactions: [] };
  //     let loanTransactions = { cat: "loan", total: 0, transactions: [] };
  //     let travelTransactions = { cat: "travel", total: 0, transactions: [] };
  //     let shoppingTransactions = {
  //       cat: "shopping",
  //       total: 0,
  //       transactions: [],
  //     };
  //     let otherTransactions = { cat: "other", total: 0, transactions: [] };
  //     let investmentTransactions = {
  //       cat: "investment",
  //       total: 0,
  //       transactions: [],
  //     };

  //     for (let i = 0; i < debitTransactions.length; i++) {
  //       switch (debitTransactions[i].transactionCat) {
  //         case "food":
  //           foodTransactions.transactions.push(debitTransactions[i]);
  //           foodTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "recharge":
  //           rechargeTransactions.transactions.push(debitTransactions[i]);
  //           rechargeTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "transfer":
  //           transferTransactions.transactions.push(debitTransactions[i]);
  //           transferTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "entertainment":
  //           entertainmentTransactions.transactions.push(debitTransactions[i]);
  //           entertainmentTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "fuel":
  //           fuelTransactions.transactions.push(debitTransactions[i]);
  //           fuelTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "groceries":
  //           groceriesTransactions.transactions.push(debitTransactions[i]);
  //           groceriesTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "medical":
  //           medicalTransactions.transactions.push(debitTransactions[i]);
  //           medicalTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "loan":
  //           loanTransactions.transactions.push(debitTransactions[i]);
  //           loanTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "travel":
  //           travelTransactions.transactions.push(debitTransactions[i]);
  //           travelTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "shopping":
  //           shoppingTransactions.transactions.push(debitTransactions[i]);
  //           shoppingTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "other":
  //           otherTransactions.transactions.push(debitTransactions[i]);
  //           otherTransactions.total += debitTransactions[i].amount;
  //           break;
  //         case "investment":
  //           investmentTransactions.transactions.push(debitTransactions[i]);
  //           investmentTransactions.total += debitTransactions[i].amount;
  //           break;
  //         default:
  //       }
  //     }

  //     let transactionCategories = [
  //       foodTransactions,
  //       rechargeTransactions,
  //       transferTransactions,
  //       entertainmentTransactions,
  //       fuelTransactions,
  //       groceriesTransactions,
  //       loanTransactions,
  //       travelTransactions,
  //       shoppingTransactions,
  //       otherTransactions,
  //       medicalTransactions,
  //       investmentTransactions,
  //     ];
  //     transactionCategories.sort((a, b) => b.total - a.total);

  //     const dashboardData = {
  //       responseType: true,
  //       error: false,
  //       totalIncome: totalIncome.toFixed(2),
  //       totalExpense: (totalExpense - investmentTransactions.total).toFixed(2),
  //       totalInvestment: investmentTransactions.total.toFixed(2),
  //       allTransactions: allTransactions.sort(
  //         (a, b) => b.transactionDate - a.transactionDate
  //       ),
  //       creditTransactions: creditTransactions.sort(
  //         (a, b) => b.transactionDate - a.transactionDate
  //       ),
  //       debitTransactions: debitTransactions.sort(
  //         (a, b) => b.transactionDate - a.transactionDate
  //       ),
  //       transactionCategories: transactionCategories.filter(
  //         (item) => item.total > 0
  //       ),
  //       stat: stat,
  //     };
  //     res.send(dashboardData);
  //   }
  // });
});

module.exports = router;
