const mongoose = require('mongoose');

module.exports.initializeDB = async () => {
  await mongoose.connect('mongodb://localhost/schedulit');

};

module.exports.mongoose = mongoose;