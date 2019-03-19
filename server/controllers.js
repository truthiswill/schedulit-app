const { createEvent, fetchEvent } = require('../database/databaseHelpers');

module.exports = {
  // login: (req, res) => {
  //   res.status(200).send("hi");
  // },
  // userGet: (req, res) => {
  //   let userID = Number(req.params.id);
  //   res.status(200).send("hi2");
  // },
  // userPost: (req, res) => {
  //   let userID = Number(req.params.id);
  //   res.status(200).send("hi2");
  // },
  // userPut: (req, res) => {
  //   let userID = Number(req.params.id);
  //   res.status(200).send("hi2");
  // },
  // userDelete: (req, res) => {
  //   let userID = Number(req.params.id);
  //   res.status(200).send("hi2");
  // },
  eventGet: (req, res) => {
    let eventID = req.params.id;
    fetchEvent(eventID)
      .then((event) => {
        res.status(200).json(event);
      })
  },
  eventPost: (req, res) => {
    let newEvent = req.body;
    newEvent.creatorId = req.user.id;
    newEvent.participants.push(req.user.id);
    createEvent(newEvent)
      .then(() => {
        res.status(200).send('event creation successful');
      })
  },
  // eventPut: (req, res) => {
  //   let eventID = Number(req.params.id);
  //   res.status(200).send("hi3");
  // },
  // eventDelete: (req, res) => {
  //   let eventID = Number(req.params.id);
  //   res.status(200).send("hi3");
  // },
  // participationGet: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // },
  // participationPost: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // },
  // participationPut: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // },
  // participationDelete: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // }
};