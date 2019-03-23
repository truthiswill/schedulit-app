const router = require('express').Router();
const {
  joinPut,
  eventPost,
  eventGet,
  userGet,
  participationGet,
  myUserGet
} = require('./controllers.js');

router
  .get('/user', myUserGet)
  .get('/user/:id', userGet)
  .get('/event/:id', eventGet)
  .post('/event', eventPost)
  .get('/participation/:id', participationGet)
  .put('/join/:eventId', joinPut);

module.exports = router;
