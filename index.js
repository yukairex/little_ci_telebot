const { bot } = require('./tel_bot.js');
const { getGasOutput } = require('./tasks/gas');

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const App = async () => {
  // setup tasks
  bot.on('message', async (msg) => {
    console.log(msg);
    if (msg.text === '/gas') {
      let out = await getGasOutput();
      bot.sendMessage(msg.chat.id, out.text, {
        parse_mode: out.mode,
      });
    }
  });

  // // setup periodic intervals
  // setInterval(async () => {
  //   let out = await getGasOutput();
  //   bot.sendMessage(chatId, out.text, {
  //     parse_mode: out.mode,
  //   });
  // }, ONE_HOUR);
};

App();
