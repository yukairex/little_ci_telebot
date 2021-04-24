const axios = require('axios');
const getData = async (url, query) => {
  try {
    let res = await axios({
      url: url,
      method: 'post',
      data: {
        query: query,
      },
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports.getGraphData = getData;
