const Blacklist = require('../models/Blacklist');

module.exports = async (i) => {
  const groupId = i.options.getString('groupid');

  await Blacklist.create({ groupId });

  return i.editReply("Group blacklisted ✔");
};
