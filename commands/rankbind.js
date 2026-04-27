const Rankbind = require('../models/Rankbind');

module.exports = async (i) => {
  const groupId = i.options.getString('groupid');
  const roleNames = i.options.getString('rolenames').split(',');
  const roleIds = i.options.getString('roles').split(',');
  const nickname = i.options.getString('nickname');

  await Rankbind.create({
    guildId: i.guild.id,
    groupId,
    roleNames,
    roleIds,
    nickname
  });

  return i.editReply("Rankbind saved ✔");
};
