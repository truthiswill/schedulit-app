const router = require('express').Router();
const {
  login,
  user,
  event,
  participation
} = require('./controllers.js');

router
  .get('/login', login)
  .post('/user/:id', user)
  .put('/event/:id', event)
  .delete('/participation/:id', participation);

module.exports = router;