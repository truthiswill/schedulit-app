const { getPassport } = require('./passportConfig');

const passport = getPassport();

module.exports = {
  authenticateUser: passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    failureRedirect: '/'
  })
  ,
  authenticateUser2: passport.authenticate('google', {
    failureRedirect: '/'
  })
  ,
  giveUserSessionToken: (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/after-auth.html');
  },
  passport: passport
}