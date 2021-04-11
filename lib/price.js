//check price from ethereum
// use https://api.coingecko.com/api/v3/coins/list?include_platform=true to check the ticker

const axios = require('axios');

const getURL = (coins) => {
  if (coins.length == 0) return null;

  let url = `https://api.coingecko.com/api/v3/simple/price?ids=`;

  url = url + coins[0];
  for (k = 1; k < coins.length; k++) {
    url = url + '%2C' + coins[k];
  }

  url = url + '&vs_currencies=usd';

  //console.log(url);
  return url;
};

const checkPrice = async (coins) => {
  let url = getURL(coins);
  let result = await axios.get(url);

  return result.data;
};

// const coins = ['bitcoin', 'ethereum'];
// checkPrice(coins);

module.exports.checkPrice = checkPrice;
