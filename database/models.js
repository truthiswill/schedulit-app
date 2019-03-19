const { mongoose } = require('./index');

module.exports = {
  timeSlotSchema: mongoose.Schema({
    startTime: Date,
    endTime: Date,
    preferenceLevel: Number
  }),

  userSchema: mongoose.Schema({
    id: { type: ObjectId, unique: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    eventsCreated: [ObjectId],
    eventsJoined: [ObjectId]
  }),

  participationSchema: mongoose.Schema({
    id: ObjectId,
    userId: ObjectId,
    eventId: ObjectId,
    timeAvailable: [timeSlotSchema],
    preferences: {
      type: Map,
      of: String
    }
  }),

  eventSchema: mongoose.Schema({
    id: { type: ObjectId, unique: true },
    creatorId: ObjectId,
    title: String,
    description: String,
    availableSlots: [timeSlotSchema],
    participants: [ObjectId],
    allowedPreferences: [String]
  });

