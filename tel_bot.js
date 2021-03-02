require('dotenv').config();
const token = process.env.TOKEN;

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });
const chatId = process.env.CHATID;

module.exports.bot = bot;
module.exports.chatId = chatId;
