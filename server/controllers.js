const { createEvent, fetchEvent, fetchUser, createParticipation, updateParticipation } = require('../database/databaseHelpers');

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
  userGet: (req, res) => {
    let userId = req.params.id;
    fetchUser(userId)
      .then((user) => {
        res.status(200).json(user);
      }).catch(() => res.status(404).end());
  },
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
  joinGet: (req, res) => {
    let eventId = req.params.id;
    let userId = req.user.id;
    createParticipation(userId, eventId).then(() => {
      res.cookie("eventId", eventId);
      res.redirect('/');
    }).catch(() => res.status(404).end());
  },
  eventGet: (req, res) => {
    let eventId = req.params.id;
    fetchEvent(eventId)
      .then((event) => {
        res.status(200).json(event);
      }).catch(() => res.status(404).end());
  },
  eventPost: (req, res) => {
    let newEvent = req.body;
    newEvent.creatorId = req.user.id;
    if (!isValidEvent(newEvent)) return res.status(404).send('invalid event object');
    newEvent.participants.push(req.user.id);
    createEvent(newEvent)
      .then((newEvent) => {
        res.status(200).json(newEvent);
      }).catch(() => {
        res.status(404).send('event post unsuccessful');
      })
  },
  // eventPut: (req, res) => {
  //   let eventId = Number(req.params.id);
  //   res.status(200).send("hi3");
  // },
  // eventDelete: (req, res) => {
  //   let eventId = Number(req.params.id);
  //   res.status(200).send("hi3");
  // },
  // participationGet: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // },
  participationPut: (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user.id;
    let participation = req.body;
    updateParticipation(userId, eventId, participation)
      .then(() => {
        res.status(201).send("participation successfully recorded");
      }).catch(() => res.status(404).end());
  }
  // participationPut: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // },
  // participationDelete: (req, res) => {
  //   let participationID = Number(req.params.id);
  //   res.status(200).send("hi4");
  // }
};