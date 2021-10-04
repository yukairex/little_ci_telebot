const axios = require('axios');
require('dotenv').config();
const URI = 'https://api.blocknative.com/gasprices/blockprices';

// data print
const print = (gas) => {
  return `
  *ETH Gas Estimation*
  baseFee: ${gas.blockPrices[0].estimatedPrices[0].price}
  maxPriorityFeePerGas: ${gas.blockPrices[0].estimatedPrices[0].maxPriorityFeePerGas}
  maxFeePerGas:: ${gas.blockPrices[0].estimatedPrices[0].maxFeePerGas}
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
  console.log(print(gas));
  return {
    text: print(gas),
    mode: 'Markdown',
  };
};

getGasOutput();
