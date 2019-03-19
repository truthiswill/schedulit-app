const { mongoose } = require('./index');
let timeSlotSchema = mongoose.Schema({
  startTime: Date,
  endTime: Date,
  preferenceLevel: Number
});

let userSchema = mongoose.Schema({
  id: { type: ObjectId, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  eventsCreated: [ObjectId],
  eventsJoined: [ObjectId]
});

let participationSchema = mongoose.Schema({
  id: ObjectId,
  userId: ObjectId,
  eventId: ObjectId,
  timeAvailable: [timeSlotSchema],
  preferences: {
    type: Map,
    of: String
  }
});

let eventSchema = mongoose.Schema({
  id: { type: ObjectId, unique: true },
  creatorId: ObjectId,
  title: String,
  description: String,
  availableSlots: [timeSlotSchema],
  participants: [ObjectId],
  allowedPreferences: [String]
});
module.exports = {
  timeSlot: mongoose.model('TimeSlot', timeSlotSchema),
  user: mongoose.model('User', userSchema),
  participation: mongoose.model('Participation', participationSchema),
  event: mongoose.model('Event', eventSchema)
};

