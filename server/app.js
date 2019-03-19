const express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passportConfig = require('./passportConfig');

// const { dbInitialize } = require('../postgresdb/index');

const router = require('./routes');
const app = express();

module.exports.initializeApp = async () => {
	// await dbInitialize();
	app.use(cookieSession({
		name: 'session',
		keys: ['thiccmilcc']
	}));
	app.use(cookieParser());
	app.use(morgan('dev'))
	app.use(parser.json());
	app.use(parser.urlencoded({
		extended: true
	}));

	passportConfig(passport)
	app.use(passport.initialize());
	app.use(passport.session());

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/google')
	}


	app.get('/protected', ensureAuthenticated, function (req, res) {
		res.send("access granted. secure stuff happens here");
	});


	app.get('/', ensureAuthenticated, (req, res) => {
		if (req.session.token) {
			res.cookie('token', req.session.token);
			res.json({
				status: 'session cookie set'
			});
		} else {
			res.cookie('token', '')
			res.json({
				status: 'session cookie not set'
			});
		}
	});
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile']
	}));
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/'
		}),
		(req, res) => {
			req.session.token = req.user.token;
			res.redirect('/');
		}
	);
};

module.exports.app = app;