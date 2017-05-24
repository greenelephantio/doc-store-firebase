'use strict';

require('rootpath')();
require('dotenv').config({silent: true});

const
    SwaggerExpress = require('swagger-express-mw'),
    requestLog = require('morgan'),
    log = require('winston'),
    app = require('express')(),
    Firebase = require('api/services/firebase.service');

module.exports = app;
let firebase = new Firebase();

app.use(requestLog('combined'));

app.use((req, res, next) => {
    req.log = log;
    req.database = firebase;
    next();
});

const config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
  log.info('app running on port %s...', port);
});
