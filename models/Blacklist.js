const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  groupId: String
});

module.exports = mongoose.model('Blacklist', schema);
