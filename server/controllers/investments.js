const router = require("express").Router();
const axios = require("axios").default;
const cheerio = require("cheerio");
const authorization = require("./authorization");
const User = require("../modal/User");
const yahooFinance = "https://finance.yahoo.com/quote/";

router.post("/", authorization, async (req, res) => {
  let { body } = req;
  const query = User.find({ _id: body.id });
  let portfolio = {};
  let userPortfolio = await query.exec();
  portfolio = await userPortfolio[0].portfolio;

  // let test = await User.findOneAndUpdate(
  //   { _id: body.id },
  //   { portfolio: portfolio }
  // ).exec();
  //US
  let usStocks = portfolio.us.stocks;
  let usStocksList = [];
  // for (let i = 0; i < usStocks.length; i++) {
  //   await axios(
  //     `https://financialmodelingprep.com/api/v3/quote/${usStocks[i].id}?apikey=9e9a1295bba2d3a7b54bb49fc82c07ff`
  //   ).then((response) => {
  //     let data = response.data[0];
  //     //Calculation values
  //     let units = usStocks[i].units;
  //     let investedNav = usStocks[i].avg;
  //     let currentNav = data.price;
  //     let priceChange = data.change;
  //     let pricePercentChange = data.changesPercentage.toFixed(2);
  //     let investmentValue = investedNav * units;
  //     let currentValue = currentNav * units;
  //     let investmentValueChange = (currentValue - investmentValue).toFixed(2);
  //     let navChange = {
  //       price: priceChange,
  //       percentage: `${pricePercentChange}%`,
  //     };
  //     let dailyStockPriceChange = priceChange * units;
  //     let totalInvestmentChange = {
  //       price: investmentValueChange,
  //       percentage: `${(
  //         (100 * investmentValueChange) /
  //         investmentValue
  //       ).toFixed(2)}%`,
  //     };
  //     let tempStocks = {
  //       id: data.name,
  //       name: data.name.toString(),
  //       units: units,
  //       investedNav: investedNav,
  //       currentNav: currentNav,
  //       investmentValue: investmentValue,
  //       currentValue: currentValue,
  //       hasTimeStamp: true,
  //       lastUpdated: data.timestamp,
  //       dailyPriceChange: dailyStockPriceChange,
  //       navChange: navChange,
  //       investmentChange: totalInvestmentChange,
  //     };
  //     usStocksList.push(tempStocks);
  //   });
  // }
  // let totalUSStocksInvestment = usStocksList.reduce(
  //   (acc, item) => acc + item.investmentValue,
  //   0
  // );
  // let totalUSStocksValue = usStocksList.reduce(
  //   (acc, item) => acc + item.currentValue,
  //   0
  // );
  // let totalUSStocksPL = totalUSStocksValue - totalUSStocksInvestment;
  // let totalUSStocksPLPercentage = (
  //   (100 * totalUSStocksPL) /
  //   totalUSStocksInvestment
  // ).toFixed(2);
  // let dailyUSStockPriceChange = usStocks.reduce(
  //   (acc, item) => acc + item.dailyPriceChange,
  //   0
  // );
  // let dailyUSStockPercentageChange = (
  //   (100 * dailyUSStockPriceChange) /
  //   totalUSStocksInvestment
  // ).toFixed(2);
  for (let i = 0; i < usStocks.length; i++) {
    await axios(yahooFinance + usStocks[i].id).then((response) => {
      let html = response.data;
      const $ = cheerio.load(html);
      let priceData = $("div > div > div > fin-streamer").html();
      let priceChangeData = $(
        "div > div > div > fin-streamer:nth-child(2) > span"
      ).html();
      let changePercentageData = $(
        "div > div > div > fin-streamer:nth-child(3) > span"
      ).html();
      let nameData = $("div > div> div > h1").html();
      let lastUpdatedData = $("#quote-market-notice > span").html();
      //Calculation values
      let units = usStocks[i].units;
      let investedNav = usStocks[i].avg;
      let currentNav = parseFloat(priceData.replace(/,/g, ""));
      let priceChange = parseFloat(priceChangeData);
      let pricePercentChange = parseFloat(
        changePercentageData.replace(/%|[(]|[)]/g, "")
      );
      let investmentValue = investedNav * units;
      let currentValue = currentNav * units;
      let investmentValueChange = (currentValue - investmentValue).toFixed(2);
      let navChange = {
        price: priceChange,
        percentage: `${pricePercentChange}%`,
      };
      let dailyStockPriceChange = priceChange * units;
      let totalInvestmentChange = {
        price: investmentValueChange,
        percentage: `${(
          (100 * investmentValueChange) /
          investmentValue
        ).toFixed(2)}%`,
      };
      let tempStocks = {
        id: usStocks[i].id,
        name: nameData.toString(),
        units: units,
        investedNav: investedNav,
        currentNav: currentNav,
        investmentValue: investmentValue,
        currentValue: currentValue,
        lastUpdated: lastUpdatedData.toString(),
        dailyPriceChange: dailyStockPriceChange,
        navChange: navChange,
        investmentChange: totalInvestmentChange,
      };
      usStocksList.push(tempStocks);
    }).catch((err) => {
      console.log(err)
    })
  }
  let totalUSStocksInvestment = usStocksList.reduce(
    (acc, item) => acc + item.investmentValue,
    0
  );
  let totalUSStocksValue = usStocksList.reduce(
    (acc, item) => acc + item.currentValue,
    0
  );
  let totalUSStocksPL = totalUSStocksValue - totalUSStocksInvestment;
  let totalUSStocksPLPercentage = (
    (100 * totalUSStocksPL) /
    totalUSStocksInvestment
  ).toFixed(2);
  let dailyUSStockPriceChange = usStocksList.reduce(
    (acc, item) => acc + item.dailyPriceChange,
    0
  );
  let dailyUSStockPercentageChange = (
    (100 * dailyUSStockPriceChange) /
    totalUSStocksInvestment
  ).toFixed(2);
  //Stocks
  let stocks = [];
  let indianStocks = portfolio.indianStocks;
  for (let i = 0; i < indianStocks.length; i++) {
    await axios(yahooFinance + indianStocks[i].id).then((response) => {
      let html = response.data;
      const $ = cheerio.load(html);
      let priceData = $("div > div > div > fin-streamer").html();
      let priceChangeData = $(
        "div > div > div > fin-streamer:nth-child(2) > span"
      ).html();
      let changePercentageData = $(
        "div > div > div > fin-streamer:nth-child(3) > span"
      ).html();
      let nameData = $("div > div> div > h1").html();
      let lastUpdatedData = $("#quote-market-notice > span").html();
      //Calculation values
      let units = indianStocks[i].units;
      let investedNav = indianStocks[i].avg;
      console.log(nameData,units,priceData)
      let currentNav = parseFloat(priceData.replace(/,/g, ""));
      let priceChange = parseFloat(priceChangeData);
      let pricePercentChange = parseFloat(
        changePercentageData.replace(/%|[(]|[)]/g, "")
      );
      let investmentValue = investedNav * units;
      let currentValue = currentNav * units;
      let investmentValueChange = (currentValue - investmentValue).toFixed(2);
      let navChange = {
        price: priceChange,
        percentage: `${pricePercentChange}%`,
      };
      let dailyStockPriceChange = priceChange * units;
      let totalInvestmentChange = {
        price: investmentValueChange,
        percentage: `${(
          (100 * investmentValueChange) /
          investmentValue
        ).toFixed(2)}%`,
      };
      let tempStocks = {
        id: indianStocks[i].id,
        name: nameData.toString(),
        units: units,
        investedNav: investedNav,
        currentNav: currentNav,
        investmentValue: investmentValue,
        currentValue: currentValue,
        lastUpdated: lastUpdatedData.toString(),
        dailyPriceChange: dailyStockPriceChange,
        navChange: navChange,
        investmentChange: totalInvestmentChange,
      };
      stocks.push(tempStocks);
    });
  }
  let totalStocksInvestment = stocks.reduce(
    (acc, item) => acc + item.investmentValue,
    0
  );
  let totalStocksValue = stocks.reduce(
    (acc, item) => acc + item.currentValue,
    0
  );
  let totalStocksPL = totalStocksValue - totalStocksInvestment;
  let totalStocksPLPercentage = (
    (100 * totalStocksPL) /
    totalStocksInvestment
  ).toFixed(2);
  let dailyStockPriceChange = stocks.reduce(
    (acc, item) => acc + item.dailyPriceChange,
    0
  );
  let dailyStockPercentageChange = (
    (100 * dailyStockPriceChange) /
    totalStocksInvestment
  ).toFixed(2);

  let MF = [];
  //MF
  let mutualFunds = portfolio.mutualFunds;
  for (let i = 0; i < mutualFunds.length; i++) {
    await axios
      .get(`https://api.mfapi.in/mf/${mutualFunds[i].id}`)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          //Mutual fund data
          let meta = response.data.meta;
          let data = response.data.data;

          //Calculation values
          let units = mutualFunds[i].units;
          let investedNav = mutualFunds[i].avg;
          let currentNav = parseFloat(data[0].nav);
          let previousNav = data[1].nav;
          let priceChange = (currentNav - previousNav).toFixed(2);
          let investmentValue = investedNav * units;
          let currentValue = currentNav * units;
          let investmentValueChange = (currentValue - investmentValue).toFixed(
            2
          );
          let dailyMFPriceChange = priceChange * units;
          let navChange = {
            price: priceChange,
            percentage: `${((100 * priceChange) / previousNav).toFixed(2)}%`,
          };
          let investmentChange = {
            price: investmentValueChange,
            percentage: `${(
              (100 * investmentValueChange) /
              investmentValue
            ).toFixed(2)}%`,
          };
          let temp = {
            id: meta.scheme_code,
            name: meta.scheme_name,
            investedNav: investedNav,
            currentNav: currentNav,
            investmentValue: investmentValue,
            currentValue: currentValue,
            units: units,
            lastUpdated: data[0].date,
            dailyMFPriceChange: dailyMFPriceChange,
            navChange: navChange,
            investmentChange: investmentChange,
          };
          MF.push(temp);
        }
      });
  }
  let totalMFInvestment = MF.reduce(
    (acc, item) => acc + item.investmentValue,
    0
  );
  let totalMFValue = MF.reduce((acc, item) => acc + item.currentValue, 0);
  let totalMFPL = totalMFValue - totalMFInvestment;
  let totalMFPLPercentage = ((100 * totalMFPL) / totalMFInvestment).toFixed(2);
  let dailyMFPriceChange = MF.reduce(
    (acc, item) => acc + item.dailyMFPriceChange,
    0
  );
  let dailyMFPercentageChange = (
    (100 * dailyMFPriceChange) /
    totalMFInvestment
  ).toFixed(2);

  res.send({
    us: {
      stocks: {
        data: usStocksList,
      },
      totalInvestment: totalUSStocksInvestment,
      currentInvestmentValue: totalUSStocksValue,
    },
    mutualFunds: {
      totalMFInvestment: totalMFInvestment,
      totalMFValue: totalMFValue,
      totalMFPL: totalMFPL,
      totalMFPLPercentage: `${totalMFPLPercentage}%`,
      dailyPriceChange: dailyMFPriceChange.toFixed(2),
      dailyPercentageChange: `${dailyMFPercentageChange}%`,
      data: MF,
    },
    stocks: {
      totalStocksInvestment: totalStocksInvestment,
      totalStocksValue: totalStocksValue,
      totalStocksPL: totalStocksPL,
      totalStocksPLPercentage: `${totalStocksPLPercentage}%`,
      dailyPriceChange: dailyStockPriceChange.toFixed(2),
      dailyPercentageChange: `${dailyStockPercentageChange}%`,
      data: stocks,
    },
  });
});

module.exports = router;
