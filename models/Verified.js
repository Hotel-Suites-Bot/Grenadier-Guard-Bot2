const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  discordId: String,
  robloxId: String,
  username: String,
  code: String
});

module.exports = mongoose.model('Verified', schema);
