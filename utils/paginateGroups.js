const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (groups, page = 0) => {
  const per = 5;
  const maxPage = Math.max(0, Math.ceil(groups.length / per) - 1);
  const p = Math.min(Math.max(page, 0), maxPage);

  const slice = groups.slice(p * per, p * per + per);
  const content = slice.map(g => `${g.group.name} — ${g.role.name}`).join('\n') || 'No groups';

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`groups_prev_${p}`).setLabel('Prev').setStyle(ButtonStyle.Secondary).setDisabled(p === 0),
    new ButtonBuilder().setCustomId(`groups_next_${p}`).setLabel('Next').setStyle(ButtonStyle.Secondary).setDisabled(p === maxPage)
  );

  return { content, components: [row], page: p, maxPage };
};
