const db = require('../controllers/mongo');
const { generate } = require('../components/menu');

module.exports = (controller) => {
  controller.on('message_received', (bot, message) => {
    let msg = '';
    const sender = message.sender.id;
    const recipient = message.recipient.id;
    if (message.message && message.message.text) {
      msg = message.message.text;
    }
    if (msg === 'test_help_delete_after') {
      bot.reply(message, `
          (Help!) I need somebody
          (Help!) Not just anybody
          (Help!) You know I need someone
          (Help!) 🆘
      `);
    } else {
      const [menu, ref] = generate();
      db.saveReferral(ref, sender);
      db.saveMessage(sender, recipient, msg);
      bot.reply(message, {
        attachment: menu,
      });
    }
  });
};
