const menu = require('../components/menu');

module.exports = (controller) => {
  controller.on('message_received', (bot, message) => {
    let msg = '';
    if (message.message && message.message.text) {
      msg = message.message.text;
    }
    if (msg === 'help') {
      bot.reply(message, `
          (Help!) I need somebody
          (Help!) Not just anybody
          (Help!) You know I need someone
          (Help!) 🆘
      `);
    } else {
      bot.reply(message, {
        attachment: menu,
      });
    }
  });
};
