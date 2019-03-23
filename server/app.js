const express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const passport = require('passport');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const { configurePassport } = require('./passportConfig');
const { initializeDB } = require('../database/index');
const { initializeSockets } = require('./sockets');
const router = require('./routes');

const app = express();
const httpServer = http.Server(app);

module.exports.initializeApp = async () => {
  await initializeDB();
  configurePassport(passport);
  app.use(cookieSession({
    name: 'session',
    keys: ['thiccmilcc']
  })
  );
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(router);
  app.use(express.static(path.resolve(__dirname, '../client/dist')));
  initializeSockets(httpServer);

};

module.exports.httpServer = httpServer;
