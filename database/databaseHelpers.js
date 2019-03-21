const { User, Event, Participation, TimeSlot } = require('./models');

module.exports = {
  fetchUser: (id) => {
    return User.findOne({ id });
  },
  fetchEvent: (id) => {
    return Event.findOne({ id });
  },
  createEvent: (event) => {
    const newEvent = new Event(event);
    return newEvent.save()
      .then((newEvent) => {
        return User.findOneAndUpdate({ id: newEvent.creatorId }, { $push: { eventsCreated: newEvent.id } })
          .then(() => {
            return newEvent;
          });
      });
  },
  updateParticipation: (userId, eventId, participation) => {
    return Participation.findOneAndUpdate({ userId, eventId }, participation, { upsert: true });
  },
  createParticipation: (userId, eventId) => {
    return Participation.findOneAndUpdate({ userId: userId, eventId: eventId }, { userId: userId, eventId: eventId }, { upsert: true }).catch((e) => console.log(e));
  }
};