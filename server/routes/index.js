const router = require("express").Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const transaction = require("../controllers/addTransaction");
const fetchTransaction = require("../controllers/dashboard");
const stat = require("../controllers/stat");
const investments = require("../controllers/investments");
const transactions = require("../controllers/transactionList");
const investmentsAdd = require("../controllers/addInvestment")
router.use("/register", register);
router.use("/login", login);
router.use("/transaction", transaction);
router.use("/dashboard", fetchTransaction);
router.use("/stat", stat);
router.use("/investments", investments);
router.use("/transactions/list", transactions);
router.use("/add/investment",investmentsAdd)
module.exports = router;
