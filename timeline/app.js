'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const _mongoose = require('./lib/mongoose-wrapper');
_mongoose.initDatabase();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'public')));

// Expose the license.html at http[s]://[host]:[port]/licences/licenses.html
app.use('/licenses', express.static(path.join(__dirname, 'licenses')));

// Hello World endpoint
app.use('/api/greeting', (request, response) => {
  const name = request.query ? request.query.name : undefined;
  response.send({ content: `Hi there, ${name || 'World!'}` });
});

// TODO: Add timeline API
app.use('/api/timeline', require('./lib/timeline.js')());

// TODO: Add liveness and readiness probes
app.use('/api/health/liveness', (request, response) => {
  if (_mongoose.getDatabaseInitTries() <= 0) {
    console.log('liveness', false);
    response.status(500).send({ status: 'failure', message: 'databaseInitTries reached zero' });
    return;  
  }
  console.log('liveness', true);
  response.send({ status: 'success' });
});

app.use('/api/health/readiness', (request, response) => {
  console.log('readiness', _mongoose.readiness());
  response.status(_mongoose.readiness() ? 200 : 500 ).send({ status: _mongoose.readiness() ? 'success' : 'failure' });
});

module.exports = app;