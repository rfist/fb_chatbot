const { to } = require('await-to-js');
const { MongoClient } = require('mongodb');
const logger = require('../logger');

const { MONGO_DB_NAME } = process.env;
const USER_COLLECTIONS = 'users';
const MESSAGES_COLLECTIONS = 'messages';
const REFERRALS_COLLECTIONS = 'referrals';
let usersCollection; let messagesCollection; let referralsCollection;

function connectToServer() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        reject(err);
      } else {
        logger.info('Mongodb is connected', err);
        usersCollection = client.db(MONGO_DB_NAME).collection(USER_COLLECTIONS);
        messagesCollection = client.db(MONGO_DB_NAME).collection(MESSAGES_COLLECTIONS);
        referralsCollection = client.db(MONGO_DB_NAME).collection(REFERRALS_COLLECTIONS);
        resolve(client);
      }
    });
  });
}

async function saveReferral(ref, sender) {
  const [err] = await to(new Promise((resolve, reject) => {
    referralsCollection.insertOne({ _id: ref, ref, sender }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }));
  if (err) {
    logger.error(`Can't save referral ${ref}, error ${err}`);
  }
  return true;
}

async function getReferral(ref) {
  const [err, referral] = await to(new Promise((resolve, reject) => {
    referralsCollection.findOne({ ref }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));
  if (err) {
    logger.error(`Can't find ref ${ref}, error ${err}`);
  }
  return referral;
}

async function getUserById(id) {
  const [err, user] = await to(new Promise((resolve, reject) => {
    usersCollection.findOne({ id }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));
  if (err) {
    logger.error(`Can't find user  by id ${id}, error ${err}`);
  }
  return user;
}

async function createUser(user) {
  const [err] = await to(new Promise((resolve, reject) => {
    usersCollection.insertOne(user, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }));
  if (err) {
    logger.error(`Can't create user ${JSON.stringify(user)}, error ${err}`);
  }
  return true;
}

async function updateUser(id, data) {
  const [err, result] = await to(new Promise((resolve, reject) => {
    usersCollection.updateOne({ id }, { $set: data }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  }));
  if (err) {
    logger.error(`Can't update user ${id} with data ${data}, error ${err}`);
  }
  return result;
}

async function saveMessage(from, into, text) {
  const msg = {
    from,
    into,
    text,
    timestamp: new Date().valueOf(),
  };
  const [err, result] = await to(new Promise((resolve, reject) => {
    messagesCollection.insertOne(msg, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  }));
  if (err) {
    logger.error(`Can't save message data ${JSON.stringify(msg)}, error ${err}`);
  }
  return result;
}

module.exports = {
  saveReferral,
  getReferral,
  connectToServer,
  createUser,
  getUserById,
  updateUser,
  saveMessage,
};
