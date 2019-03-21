const express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passportConfig = require('./passportConfig');

const { initializeDB } = require('../database/index');
const { joinGet } = require('./controllers');
const router = require('./routes');
const app = express();

module.exports.initializeApp = async () => {
  await initializeDB();
  app.use(
    cookieSession({
      name: 'session',
      keys: ['thiccmilcc']
    })
  );
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));

  passportConfig(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/google');
  }

  app.use('/api', ensureAuthenticated, router);

  app.get('/protected', ensureAuthenticated, function(req, res) {
    res.send('access granted. secure stuff happens here');
  });

  app.get('/join/:id', ensureAuthenticated, joinGet);

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/'
    }),
    (req, res) => {
      req.session.token = req.user.token;
      res.redirect('/');
    }
  );
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
  app.use(express.static(path.resolve(__dirname, '../client/dist')));
};

module.exports.app = app;
