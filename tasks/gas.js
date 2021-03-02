const axios = require('axios');
const gasNowURL =
  'https://www.gasnow.org/api/v3/gas/price?utm_source=:Keep_Tipping_Bot';

// get gas from gasnow, returns in unit of gWEI
const getGas = async () => {
  try {
    const response = await axios.get(gasNowURL);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// data print
const print = (gas) => {
  return `
  *Gas:*
  rapid: ${parseFloat(gas.rapid / 1e9).toFixed(0)} 
  fast: ${parseFloat(gas.fast / 1e9).toFixed(0)}
  standard: ${parseFloat(gas.standard / 1e9).toFixed(0)}
  slow: ${parseFloat(gas.slow / 1e9).toFixed(0)}
  `;
};

// called by bot in the real time
const getGasOutput = async () => {
  let gas = await getGas();
  return {
    text: print(gas),
    mode: 'Markdown',
  };
};

module.exports.getGasOutput = getGasOutput;
