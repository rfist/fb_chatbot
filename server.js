require('dotenv').load();
const fs = require('fs');
const path = require('path');

const db = require('./app/controllers/mongo');
const controller = require('./app/components/bot');
const logger = require('./app/logger');
const webserver = require('./app/components/express_webserver.js');

logger.info('Starting...');

db.connectToServer()
  .then(() => webserver.start(controller))
  .then(() => {
    const normalizedPath = path.join(__dirname, 'app', 'skills');
    fs.readdirSync(normalizedPath).forEach((file) => {
      require(`./app/skills/${file}`)(controller);
      logger.info(`Connect ${file} skill`);
    });
    logger.info('Bot has been started');
  });
