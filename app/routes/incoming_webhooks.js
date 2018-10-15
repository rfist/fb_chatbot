module.exports = (app, botkit) => {
  app.get('/webhook', (req, res) => {
    const { VERIFY_TOKEN } = process.env;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }
  });

  app.post('/webhook', (req, res) => {
    const { body } = req;
    if (body.object === 'page') {
      botkit.handleWebhookPayload(req, res, botkit.spawn({}));
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  });
};
