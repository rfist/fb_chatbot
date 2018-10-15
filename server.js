require('dotenv').load();
const fs = require('fs');
const path = require('path');
const controller = require('./app/components/bot');
const logger = require('./app/logger');

require('./app/components/express_webserver.js')(controller);

const normalizedPath = path.join(__dirname, 'app', 'skills');
fs.readdirSync(normalizedPath).forEach((file) => {
  require(`./app/skills/${file}`)(controller);
});

logger.info('Starting...');
