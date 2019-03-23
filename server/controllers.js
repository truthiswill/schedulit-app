const {
  createEvent,
  fetchEvent,
  fetchUser,
  createParticipation,
  fetchParticipation,
  updateParticipation
} = require('../database/databaseHelpers');

const isValidEvent = event => {
  if (
    typeof event.creatorId !== 'string' ||
    typeof event.title !== 'string' ||
    event.title.length === 0 ||
    typeof event.description !== 'string' ||
    event.description.length === 0 ||
    !Array.isArray(event.availableSlots) ||
    !Array.isArray(event.participants)
    //client must send participants array
  ) {
    return false;
  }
  return true;
};

module.exports = {
  myUserGet: (req, res) => {
    let userId = req.user.id;
    fetchUser(userId).then(user => {
      res.status(200).json(user);
    });
  },
  userGet: (req, res) => {
    let userId = req.params.id;
    fetchUser(userId)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(() => res.status(404).end());
  },
  joinGet: (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user.id;
    createParticipation(userId, eventId)
      .then(() => {
        res.cookie("eventId", eventId);
      })
      .finally(() => {
        res.redirect('/');
      });
  },
  eventGet: (req, res) => {
    let eventId = req.params.id;
    fetchEvent(eventId)
      .then(event => {
        res.status(200).json(event);
      })
      .catch(() => res.status(404).end());
  },
  eventPost: (req, res) => {
    let newEvent = req.body;
    newEvent.creatorId = req.user.id;
    if (!isValidEvent(newEvent))
      return res.status(404).send('invalid event object');
    newEvent.participants.push(req.user.id);
    createEvent(newEvent)
      .then(newEvent => {
        res.status(200).json(newEvent);
      })
      .catch(() => {
        res.status(404).send('event post unsuccessful');
      });
  },
  participationGet: (req, res) => {
    let id = req.params.id;
    fetchParticipation(id)
      .then(participation => {
        res.status(200).json(participation);
      })
      .catch(() => res.status(404).end());
  },
  joinPut: (req, res) => {
    let eventId = req.params.eventId;
    let userId = req.user.id;
    let participation = req.body;
    updateParticipation(userId, eventId, participation)
      .then(() => {
        res.status(201).send('participation successfully recorded');
      })
      .catch(() => res.status(404).end());
  }
};
