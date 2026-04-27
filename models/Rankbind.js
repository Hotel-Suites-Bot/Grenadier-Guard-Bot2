const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: String,
  groupId: String,
  roleNames: [String],
  roleIds: [String],
  nickname: String
});

module.exports = mongoose.model('Rankbind', schema);
