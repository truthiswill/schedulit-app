const { User, Event, Participation, TimeSlot } = require('./models');

module.exports = {
  fetchUser: (id) => {
    return User.find({ id });
  },
  fetchEvent: (id) => {
    return Event.find({ id });
  },
  createEvent: (event) => {
    const newEvent = new Event(event);
    return newEvent.save();
  },
  createParticipation: (participation) => {
    return Participation.findOneAndUpdate({ userId: participation.userId, eventId: participation.eventId }, participation, { upsert: true });
  }
};