const { bot } = require('./tel_bot.js');
const { getHelp } = require('./tasks/help');
const { getGasOutput } = require('./tasks/gas_on_mempool');
const { getEvents } = require('./tasks/event');
const { getFeiInfo, ListenToReweight } = require('./tasks/fei');
const { getAaveAPR } = require('./tasks/aave');

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const App = async () => {
  // setup tasks
  bot.on('message', async (msg) => {
    console.log(msg);

    if (msg.text === '/help') {
      let out = getHelp();
      bot.sendMessage(msg.chat.id, out.text, {
        parse_mode: out.mode,
      });
    }

    if (msg.text === '/gas') {
      let out = await getGasOutput();
      console.log(msg.chat.id);
      bot.sendMessage(msg.chat.id, out.text, {
        parse_mode: out.mode,
      });
    }

    if (msg.text === '/aave') {
      let out = await getAaveAPR();
      console.log(msg.chat.id);
      bot.sendMessage(msg.chat.id, out.text, {
        parse_mode: out.mode,
      });
    }

    if (msg.text === '/event') {
      let out = getEvents();
      console.log(out);

      bot.sendMessage(msg.chat.id, out.text, {
        parse_mode: out.mode,
      });
    }

    // if (msg.text === '/fei') {
    //   let out = await getFeiInfo();
    //   bot.sendMessage(msg.chat.id, out.text, {
    //     parse_mode: out.mode,
    //   });
    // }
  });

  // listener
  ListenToReweight();

  // // setup periodic intervals
  // setInterval(async () => {
  //   let out = await getGasOutput();
  //   bot.sendMessage(chatId, out.text, {
  //     parse_mode: out.mode,
  //   });
  // }, ONE_HOUR);
};

App();
