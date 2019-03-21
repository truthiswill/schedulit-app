const router = require('express').Router();
const {
	login,
	user,
	event,
	participation,
	eventPost,
	eventGet,
	userGet,
	participationPut
} = require('./controllers.js');

router
	// .get('/login', login)

	.get('/user/:id', userGet)
	// .post('/user/:id', userPost)
	// .put('/user/:id', userPut)
	// .put('/event/:id', eventPut)
	.get('/event/:id', eventGet)
	.post('/event', eventPost)
	// .put('/event/:id', eventPut)
	// .delete('/event/:id', eventDelete)
	// .get('/participation/:id', participationGet)
	.put('/participation/:eventId', participationPut);
// .put('/participation/:id', participationPut)
// .delete('/participation/:id', participationDelete)

module.exports = router;
