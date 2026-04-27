const { Rankbinds } = require('../db');
const { RANKBIND_ROLE } = require('../config');

module.exports = async (i) => {
  if (!i.member.roles.cache.has(RANKBIND_ROLE)) {
    return i.reply({ content: 'No permission', ephemeral: true });
  }

  const gid = i.options.getString('groupid');
  const names = i.options.getString('rolenames').split(',').map(s => s.trim());
  const roles = i.options.getString('roles').split(',').map(s => s.trim());
  const nickname = i.options.getString('nickname');

  await Rankbinds.create({
    groupId: gid,
    roleNames: names,
    discordRoles: roles,
    nickname
  });

  i.reply({ content: 'Rankbind Added', ephemeral: true });
};
