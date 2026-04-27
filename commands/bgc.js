const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getUserId, getUserInfo, getGroups, getFriends, getBadges, getAvatar } = require('../roblox');
const { Blacklist } = require('../db');
const { BGC_ROLE } = require('../config');
const paginate = require('../utils/paginateGroups');

module.exports = async (i) => {
  if (!i.member.roles.cache.has(BGC_ROLE)) {
    return i.reply({ content: 'No permission', ephemeral: true });
  }

  const username = i.options.getString('username');
  const id = await getUserId(username);
  if (!id) return i.reply({ content: 'Invalid username', ephemeral: true });

  const info = await getUserInfo(id);
  const groups = await getGroups(id);
  const friends = await getFriends(id);
  const badges = await getBadges(id);
  const avatar = await getAvatar(id);

  const bl = await Blacklist.find();
  const flagged = groups.filter(g => bl.some(b => b.groupId == g.group.id));

  const embed = new EmbedBuilder()
    .setTitle(`${info.name} Background Check`)
    .setURL(`https://www.roblox.com/users/${id}/profile`)
    .setThumbnail(avatar)
    .addFields(
      { name: 'Friends', value: String(friends), inline: true },
      { name: 'Badges', value: String(badges), inline: true },
      { name: 'Groups', value: String(groups.length), inline: true },
      { name: 'Requirements', value: `${badges>=60?'✅':'❌'} 60+ Badges\n${friends>=1?'✅':'❌'} Has Friends` },
      { name: 'Blacklisted', value: flagged.length ? '⚠️ Found' : 'None' }
    );

  const pageData = paginate(groups, 0);
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`bgc_groups_${id}_0`).setLabel('View Groups').setStyle(ButtonStyle.Secondary)
  );

  await i.reply({ embeds: [embed], components: [row] });
};
