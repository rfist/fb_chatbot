const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { to } = require('await-to-js');
const logger = require('../logger');

const normalizedPath = path.normalize(`${__dirname}/../..`);
const webserver = express();
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));


webserver.use(express.static(`${normalizedPath}/public`));
webserver.set('port', (process.env.PORT));
webserver.set('https_port', (process.env.HTTPS_PORT));

async function statHttp() {
  const [err] = await to(new Promise((resolve, reject) => {
    webserver.listen(webserver.get('port'), null, (error) => {
      if (error) {
        reject(error);
      } else {
        logger.info(`Http server has been started at ${webserver.get('port')}`);
        resolve();
      }
    });
  }));
  if (err) {
    logger.error(`Can't start http server, ${err}`);
  }
}

async function startHttps() {
  const [err] = await to(new Promise((resolve, reject) => {
    const key = fs.readFileSync(path.join(normalizedPath, 'sslcert', 'server.key'), 'utf8');
    const cert = fs.readFileSync(path.join(normalizedPath, 'sslcert', 'server.cert'), 'utf8');
    https.createServer({
      key,
      cert,
    }, webserver).listen(webserver.get('https_port'), (error) => {
      if (error) {
        reject(error);
      } else {
        logger.info(`Https server has been started at ${webserver.get('https_port')}`);
        resolve();
      }
    });
  }));
  if (err) {
    logger.error(`Can't start http server, ${err}`);
  }
}

module.exports.start = async (controller) => {
  await statHttp();
  await startHttps();
  const normalizedRoutesPath = path.join(normalizedPath, 'app', 'routes');
  fs.readdirSync(normalizedRoutesPath).forEach((file) => {
    require(path.join(normalizedRoutesPath, file))(webserver, controller);
    logger.info(`Connect ${file} route`);
  });
};
