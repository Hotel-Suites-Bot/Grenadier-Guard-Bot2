const { Verified, Rankbinds } = require('../db');
const { getGroups } = require('../roblox');

module.exports = async (member) => {
  try {
    const user = await Verified.findOne({ discordId: member.id });
    if (!user) return;

    const groups = await getGroups(user.robloxId);
    const binds = await Rankbinds.find();

    let add = new Set();
    let remove = new Set();
    let chosenNickname = null;

    for (const b of binds) {
      const match = groups.find(g => g.group.id == b.groupId);

      if (!match) {
        b.discordRoles.forEach(r => remove.add(r));
        continue;
      }

      const role = match.role.name.toLowerCase();

      if (b.roleNames.some(n => role.includes(n.toLowerCase()))) {
        b.discordRoles.forEach(r => add.add(r));

        if (!chosenNickname && b.nickname) {
          chosenNickname = b.nickname
            .replace('{roblox-username}', user.username)
            .replace('{group-rank}', match.role.name);
        }
      } else {
        b.discordRoles.forEach(r => remove.add(r));
      }
    }

    for (const r of add) await member.roles.add(r).catch(()=>{});
    for (const r of remove) await member.roles.remove(r).catch(()=>{});

    if (chosenNickname) {
      await member.setNickname(chosenNickname).catch(()=>{});
    }
  } catch (e) {
    console.error('UpdateRoles error:', e);
  }
};
