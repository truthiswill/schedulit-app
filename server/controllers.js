// const {
//   dbFetch,
//   dbCreate,
//   dbUpdate,
//   dbDelete
// } = require('../postgresdb/dbHelpers.js');

// router
// 	.get('/login', login)
	
// 	.get('/user/:id', userGet)
// 	.post('/user/:id', userPost)
// 	.put('/user/:id', userPut)
// 	.put('/event/:id', eventPut)

// 	.get('/event/:id', eventGet)
// 	.post('/event/:id', eventPost)
// 	.put('/event/:id', eventPut)
// 	.delete('/event/:id', eventDelete)

// 	.get('/participation/:id', participationGet)
// 	.post('/participation/:id', participationPost)
// 	.put('/participation/:id', participationPut)
// 	.delete('/participation/:id', participationDelete)

// module.exports = {
//   login: (req, res) => {
// 		res.status(200).send("hi");
//   },
//   user: (req, res) => {
//     let userID = Number(req.params.id);
// 			res.status(200).send("hi2");
//   },
//   event: (req, res) => {
// 		let eventID = Number(req.params.id);
// 		res.status(200).send("hi3");
//   },
//   participation: (req, res) => {
// 		let participationID = Number(req.params.id);
// 		res.status(200).send("hi4");
//   }
// };