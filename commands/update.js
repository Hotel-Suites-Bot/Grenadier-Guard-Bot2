const Verified = require('../models/Verified');

module.exports = async (i) => {
  const data = await Verified.findOne({ discordId: i.user.id });

  if (!data) return i.editReply("Not verified.");

  return i.editReply("Roles updated ✔ (hook your rankbind logic here)");
};
