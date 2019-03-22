const router = require('express').Router();
const {
  login,
  user,
  event,
  joinPut,
  eventPost,
  eventGet,
  userGet,
  participationGet,
  joinGet,
  myUserGet
} = require('./controllers.js');

router
  // .get('/login', login)
  .get('/user', myUserGet)
  .get('/user/:id', userGet)
  // .post('/user/:id', userPost)
  // .put('/user/:id', userPut)
  // .put('/event/:id', eventPut)
  .get('/event/:id', eventGet)
  .post('/event', eventPost)
  // .put('/event/:id', eventPut)
  // .delete('/event/:id', eventDelete)

  .get('/participation/:id', participationGet)
  // .post('/participation/:id', participationPost)


  .put('/join/:eventId', joinPut)
// .delete('/participation/:id', participationDelete)

module.exports = router;
