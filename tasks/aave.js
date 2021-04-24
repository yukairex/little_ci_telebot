// calculate aave v2 staking apy based on the following rules

// EVERY DAY 2200 stkAave based on borrowing volume
// USDT, USDC, DAI, GUSD 50/50
// WBTC, ETH 95/5

// subgraph playground
// https://thegraph.com/explorer/subgraph/aave/protocol-v2?version=current

const axios = require('axios');
const { utils } = require('ethers');
const { checkPrice } = require('../lib/price');
const { getGraphData } = require('../lib/getGraphData');
const stringTable = require('string-table');
const URL = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2';

const query = `{
  reserves (id:"0x2260fac5e5542a773aa44fbcfedf7c193bc2c5990xb53c1a33016b2dc2ff3653530bff1848a515c8c5") {
    id
    symbol
    decimals
    totalLiquidity
    availableLiquidity
    totalDeposits
    totalScaledVariableDebt
    totalPrincipalStableDebt
    totalCurrentVariableDebt
  }
}`;

const assets = [];
const symbol_lists = ['USDT', 'USDC', 'DAI', 'GUSD', 'WETH', 'WBTC'];

const App = async () => {
  // check price from coingecki
  let price = await checkPrice(['bitcoin', 'ethereum', 'aave']);
  console.log(price);
  let data = await getGraphData(URL, query);
  let reserves = data.reserves;

  let total_market = 0; // total market in usd
  for (let r of reserves) {
    let asset = {};
    if (symbol_lists.includes(r.symbol)) {
      asset.symbol = r.symbol;
      asset.decimal = r.decimals;
      asset.liquidty = utils.formatUnits(r.availableLiquidity, r.decimals);
      asset.deposit = utils.formatUnits(r.totalDeposits, r.decimals);
      asset.borrow = asset.deposit - asset.liquidty;

      let current_price = 1;

      if (asset.symbol == 'WETH') {
        current_price = price.ethereum.usd;
      }
      if (asset.symbol == 'WBTC') {
        current_price = price.bitcoin.usd;
      }

      asset.deposit_in_usd = asset.deposit * current_price;
      asset.borrow_in_usd = asset.borrow * current_price;

      total_market += asset.borrow_in_usd;

      assets.push(asset);
      // console.log(asset.symbol);
      // console.log(asset.deposit / 1);
      // console.log(asset.borrow);
    }
  }

  // calculate apr

  assets.forEach((a) => {
    a.share = a.borrow_in_usd / total_market;
    a.reward_per_day = a.share * 2200 * price.aave.usd; // in usd
    let lending_share_ratio = 0.5;
    if (a.symbol == 'WETH' || a.symbol == 'WBTC') lending_share_ratio = 0.95;

    a.lender_apy = (
      ((a.reward_per_day * lending_share_ratio) / a.deposit_in_usd) *
      365 *
      100
    ).toFixed(2);
    a.borrower_apy = (
      ((a.reward_per_day * (1 - lending_share_ratio)) / a.borrow_in_usd) *
      365 *
      100
    ).toFixed(2);
  });
  console.log(assets);

  let table = stringTable.create(assets, {
    headers: ['symbol', 'lender_apy', 'borrower_apy'],
    formatters: {
      lender_apy: (value) => {
        return value.toString() + '%';
      },
      borrower_apy: (value) => {
        return value.toString() + '%';
      },
    },
  });
  console.log(table);

  return {
    text: `<pre> ${table} </pre>`,
    mode: 'HTML',
  };
};

//App();
module.exports.getAaveAPR = App;
