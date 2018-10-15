module.exports = (controller) => {
  controller.on('facebook_postback', (bot, message) => {
    if (message.payload === 'shop') {
      console.log('shop payload');
    }
  });
};
