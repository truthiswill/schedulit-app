// const {
//   dbFetch,
//   dbCreate,
//   dbUpdate,
//   dbDelete
// } = require('../postgresdb/dbHelpers.js');

module.exports = {
  login: (req, res) => {
		res.status(200).send("hi");
  },
  user: (req, res) => {
    let userID = Number(req.params.id);
    // dbCreate(product)
    //   .then(productId =>
    //     res.status(201).json(Object.assign({ productId }, product))
    //   )
		//   .catch(() => res.status(404).end());
			res.status(200).send("hi2");
  },
  event: (req, res) => {
		let eventID = Number(req.params.id);
		res.status(200).send("hi3");
  },
  participation: (req, res) => {
		let participationID = Number(req.params.id);
		res.status(200).send("hi4");
  }
};