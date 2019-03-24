const { getPassport } = require('./passportConfig');

const passport = getPassport();

module.exports = {
  authenticateUser: passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  })
  ,
  authenticateUser2: passport.authenticate('google', {
    failureRedirect: '/'
  })
  ,
  giveUserSessionToken: (req, res) => {
    req.session.token = req.user.token;
    if (req.cookies.sendToHome) {
      console.log('found send to home');
      res.redirect('/');
    } else {
      res.redirect('/after-auth.html');
    }
  },
  passport: passport
}