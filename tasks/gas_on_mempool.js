const axios = require('axios');
require('dotenv').config();
const URI = 'https://api.blocknative.com/gasprices/blockprices';

// data print
const print = (gas) => {
  return `
  ETH Gas baseFee: ${gas.blockPrices[0].baseFeePerGas.toFixed(2)}
  `;
};

const getGas = async () => {
  try {
    let info = await axios.get(URI, {
      headers: {
        Authorization: process.env.MEMPOOL_KEY,
      },
    });
    return info.data;
  } catch (error) {
    console.error(error);
  }
};

const getGasOutput = async () => {
  let gas = await getGas();
  //console.log(print(gas));
  return {
    text: print(gas),
    mode: 'Markdown',
  };
};

getGasOutput();
