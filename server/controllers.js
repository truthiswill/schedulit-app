
router
	.get('/login', login)
	
	.get('/user/:id', userGet)
	.post('/user/:id', userPost)
	.put('/user/:id', userPut)
	.put('/event/:id', eventPut)

	.get('/event/:id', eventGet)
	.post('/event/:id', eventPost)
	.put('/event/:id', eventPut)
	.delete('/event/:id', eventDelete)

	.get('/participation/:id', participationGet)
	.post('/participation/:id', participationPost)
	.put('/participation/:id', participationPut)
	.delete('/participation/:id', participationDelete)

module.exports = {
  login: (req, res) => {
		res.status(200).send("hi");
  },
  userGet: (req, res) => {
    let userID = Number(req.params.id);
			res.status(200).send("hi2");
	},
	userPost: (req, res) => {
    let userID = Number(req.params.id);
			res.status(200).send("hi2");
	},
	userPut: (req, res) => {
    let userID = Number(req.params.id);
			res.status(200).send("hi2");
	},
	userDelete: (req, res) => {
    let userID = Number(req.params.id);
			res.status(200).send("hi2");
	},
  eventGet: (req, res) => {
		let eventID = Number(req.params.id);
		res.status(200).send("hi3");
	},
	eventPost: (req, res) => {
		let eventID = Number(req.params.id);
		res.status(200).send("hi3");
	},
	eventPut: (req, res) => {
		let eventID = Number(req.params.id);
		res.status(200).send("hi3");
	},
	eventDelete: (req, res) => {
		let eventID = Number(req.params.id);
		res.status(200).send("hi3");
  },
  participationGet: (req, res) => {
		let participationID = Number(req.params.id);
		res.status(200).send("hi4");
	},
	participationPost: (req, res) => {
		let participationID = Number(req.params.id);
		res.status(200).send("hi4");
	},
	participationPut: (req, res) => {
		let participationID = Number(req.params.id);
		res.status(200).send("hi4");
	},
	participationDelete: (req, res) => {
		let participationID = Number(req.params.id);
		res.status(200).send("hi4");
  }
};