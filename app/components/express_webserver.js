const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const logger = require('../logger');

module.exports = (controller) => {
  const normalizedPath = path.normalize(`${__dirname}/../..`);

  const webserver = express();
  webserver.use(bodyParser.json());
  webserver.use(bodyParser.urlencoded({ extended: true }));


  webserver.use(express.static(`${normalizedPath}/public`));
  webserver.set('port', (process.env.PORT));
  webserver.set('https_port', (process.env.HTTPS_PORT));

  webserver.listen(webserver.get('port'), null, () => {
    logger.info(`Express webserver configured and listening at http://localhost:${webserver.get('port')}`);
  });
  const key = fs.readFileSync(path.join(normalizedPath, 'sslcert', 'server.key'), 'utf8');
  const cert = fs.readFileSync(path.join(normalizedPath, 'sslcert', 'server.cert'), 'utf8');
  https.createServer({
    key,
    cert,
  }, webserver).listen(webserver.get('https_port'), () => logger.info(`https server has been started at ${webserver.get('https_port')}`));

  const normalizedRoutesPath = path.join(normalizedPath, 'app', 'routes');
  fs.readdirSync(normalizedRoutesPath).forEach((file) => {
    require(path.join(normalizedRoutesPath, file))(webserver, controller);
  });

  return webserver;
};
