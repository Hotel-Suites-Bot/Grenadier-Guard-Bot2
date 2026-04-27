const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getUserId } = require('../roblox');

module.exports = async (i) => {
  const username = i.options.getString('username');
  const id = await getUserId(username);
  if (!id) return i.reply({ content: 'Invalid username', ephemeral: true });

  const embed = new EmbedBuilder()
    .setTitle('Roblox Verification')
    .setDescription('Click **Show Code**, put it in your Roblox bio, then click **Done**.');

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(`code_${id}`).setLabel('Show Code').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(`done_${id}`).setLabel('Done').setStyle(ButtonStyle.Success)
  );

  i.reply({ embeds: [embed], components: [row], ephemeral: true });
};
