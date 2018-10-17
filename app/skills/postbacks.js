const db = require('../controllers/mongo');
const { greetings } = require('../components/menu');

module.exports = (controller) => {
  controller.on('facebook_postback', (bot, message) => {
    if (message.payload === 'shop') {
      console.log('shop payload');
    }
  });
  controller.on('facebook_referral', async (bot, message) => {
    const userId = message.user;
    const { ref } = message.postback.referral;
    const { sender } = await db.getReferral(ref);
    const user = await db.getUserById(userId);
    if (!user) {
      await db.createUser({ id: userId, invitedBy: sender });
      bot.reply(message, {
        attachment: greetings(),
      });
      bot.say(
        {
          text: 'Your link is activated!',
          channel: sender,
        },
      );
    }
  });
};
