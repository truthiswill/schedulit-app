const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../database/models');

module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google');
};

module.exports.getPassport = () => {
  const passport = require('passport');
  console.log('created a new passport');
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ id }).then(user => done(null, user));
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback'
      },
      (token, refreshToken, profile, done) => {
        User.findOneAndUpdate(
          { id: profile.id },
          { id: profile.id, googleProfile: profile._json },
          { upsert: true, new: true }
        ).then(userDocument => {
          userDocument.token = token;
          return done(null, userDocument);
        });
      }
    )
  );
  return passport;
};
