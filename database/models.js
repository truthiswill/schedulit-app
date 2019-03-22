const { mongoose } = require('./index');
const ObjectId = mongoose.Schema.Types.ObjectId;
let timeSlotSchema = mongoose.Schema({
  startTime: Date,
  endTime: Date,
  preferenceLevel: { type: Number, default: 1 },
});

let userSchema = mongoose.Schema({
  id: { type: String, unique: true },
  googleProfile: {
    type: Map,
    of: String
  },
  eventsCreated: { type: [ObjectId], default: [] },
  eventsJoined: { type: [ObjectId], default: [] }
});

let participationSchema = mongoose.Schema({
  id: { type: ObjectId, unique: true, auto: true },
  userId: String,
  eventId: ObjectId,
  unavailable: { type: Boolean, default: false },
  timeAvailable: [timeSlotSchema],
  preferences: {
    type: Map,
    of: String
  }
});

let eventSchema = mongoose.Schema({
  id: { type: ObjectId, unique: true, auto: true },
  creatorId: String,
  title: String,
  description: String,
  availableSlots: [timeSlotSchema],
  participations: { type: [ObjectId], default: [] },
  participants: [String],
  allowedPreferences: { type: [String], default: [] },
});


module.exports = {
  TimeSlot: mongoose.model('TimeSlot', timeSlotSchema),
  User: mongoose.model('User', userSchema),
  Participation: mongoose.model('Participation', participationSchema),
  Event: mongoose.model('Event', eventSchema),
  ObjectId: mongoose.Types.ObjectId
};

