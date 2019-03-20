const { createEvent, fetchEvent } = require('../database/databaseHelpers');

const isValidEvent = (event) => {
  if (typeof event.creatorId !== 'string'
    || typeof event.title !== 'string'
    || event.title.length === 0
    || typeof event.description !== 'string'
    || event.description.length === 0
    || !Array.isArray(event.availableSlots)
    || !Array.isArray(event.participants)
    //client must send participants array 
  ) {
    return false;
  }
  return true;
};


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
    if (!isValidEvent(newEvent)) return res.status(404).send('invalid event object');
    newEvent.participants.push(req.user.id);
    createEvent(newEvent)
      .then(() => {
        res.status(200).send('event creation successful');
      }).catch(() => {
        res.status(404).send('event post unsuccessful');
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