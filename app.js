'use strict';

require('rootpath')();
require('dotenv').config({silent: true});

const
    SwaggerExpress = require('swagger-express-mw'),
    requestLog = require('morgan'),
    log = require('winston'),
    app = require('express')(),
    FirebaseDatabase = require('api/services/firebase.database'),
    FirebaseStorage = require('api/services/firebase.storage');

module.exports = app;

app.use(requestLog('combined'));

app.use((req, res, next) => {
    req.log = log;
    req.database = new FirebaseDatabase();
    req.storage = new FirebaseStorage();
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
