const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../database/models');

module.exports = passport => {
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
          { upsert: true }
        ).then(userDocument => {
          userDocument.token = token;
          return done(null, userDocument);
        });
      }
    )
  );
};
