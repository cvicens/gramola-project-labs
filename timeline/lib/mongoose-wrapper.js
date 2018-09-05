// TODO: Add mongoose support
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || "mydb";
const DB_SERVICE_NAME = process.env.DB_SERVICE_NAME || "localhost";
const DB_SERVICE_PORT = process.env.DB_SERVICE_PORT || "27017";

const options = {
  useNewUrlParser: true,
  //autoIndex: false, // Don't build indexes
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 1000, // Reconnect every X ms
  //poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  user: DB_USERNAME,
  pass: DB_PASSWORD
};

const mongoose = require('mongoose');

mongoose.connection.on('connecting', function() {
    console.log('Connecting to MongoDB...');
});

mongoose.connection.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
mongoose.connection.on('connected', function() {
    console.log('MongoDB connected!');
});
mongoose.connection.once('open', function() {
    console.log('MongoDB connection opened!');
});
mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
mongoose.connection.on('disconnected', function() {
    console.log('MongoDB disconnected!');
});

let databaseInitTries = 3;
let databaseInitInterval = 1000;
let databaseInitialized = false;

function initDatabase () {
  connect()
  .then((connection) => {
    databaseInitialized = true;
    process.once('SIGUSR2', function () {
      console.log('About to close mongodb connection');
      if (connection) {
        connection.close(function (err) {
          if (err) {
            console.error('Error while closing connection', err);
          }
          console.log('About to kill process!');
          process.kill(process.pid, 'SIGUSR2');
        });
      }
    });
  })
  .catch((err) => {
    console.error('initDatabase err:', err);
    if (databaseInitTries > 0) {
      databaseInitTries--;
      setTimeout(initDatabase, databaseInitInterval);
    } else {
      //process.exit(1);
    }
  });
}

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${DB_SERVICE_NAME}:${DB_SERVICE_PORT}/${DB_NAME}`, options)
        .then((res) => {
            if (mongoose.connection && mongoose.connection.readyState === 1) {
                console.log('mongoose connected to ', `mongodb://${DB_SERVICE_NAME}:${DB_SERVICE_PORT}/${DB_NAME}`);
                resolve(mongoose.connection);
            } else {
                console.log('mongoose NOT connected to ', `mongodb://${DB_SERVICE_NAME}:${DB_SERVICE_PORT}/${DB_NAME}`);
                reject('mongoose NOT connected status:', mongoose.connection.readyState);
            }
        })
        .catch((err) => {
            reject(err);
          }
        );
    });
}

function readiness() {
    return mongoose && mongoose.connection && mongoose.connection.readyState === 1;
}

function getDatabaseInitTries() {
    return databaseInitTries;
}

function getDatabaseInitialized() {
    return databaseInitialized;
}

module.exports.connect = connect;
module.exports.readiness = readiness;
module.exports.initDatabase = initDatabase;
module.exports.getDatabaseInitTries = getDatabaseInitTries;
module.exports.getDatabaseInitialized = getDatabaseInitialized;