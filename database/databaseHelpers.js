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
  createParticipation: (participation) => {
    return Participation.findOneAndUpdate({ userId: participation.userId, eventId: participation.eventId }, participation, { upsert: true });
  }
};