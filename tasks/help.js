const stringTable = require('string-table');

const help = [
  {
    name: '/gas',
    description: 'return current gas fee on Ethereum',
  },
];

const print = () => {
  let table = stringTable.create(help);
  console.log(table);
  return {
    text: `<pre> ${table} </pre>`,
    mode: 'HTML',
  };
};

module.exports.getHelp = print;
