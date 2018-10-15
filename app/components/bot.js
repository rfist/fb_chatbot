const botkit = require('botkit');

const controller = botkit.facebookbot({
  verify_token: process.env.VERIFY_TOKEN,
  access_token: process.env.FB_ACCESS_TOKEN,
});

module.exports = controller;
