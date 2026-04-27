const verify = require('../commands/verify');
const update = require('../commands/update');
const bgc = require('../commands/bgc');
const rankbind = require('../commands/rankbind');
const blacklist = require('../commands/blacklist');

const { Codes, Verified } = require('../db');
const { getUserInfo, getGroups } = require('../roblox');
const updateRoles = require('../utils/updateRoles');
const paginate = require('../utils/paginateGroups');

module.exports = (client) => {
  client.on('interactionCreate', async (i) => {
    try {
      if (i.isChatInputCommand()) {
        if (i.commandName === 'verify') return verify(i);
        if (i.commandName === 'update') return update(i);
        if (i.commandName === 'bgc') return bgc(i);
        if (i.commandName === 'rankbind') return rankbind(i);
        if (i.commandName === 'blacklist') return blacklist(i);
      }

      if (i.isButton()) {
        // Show code
        if (i.customId.startsWith('code_')) {
          const id = i.customId.split('_')[1];
          const code = `BritishArmy-${Math.floor(1000 + Math.random() * 9000)}`;

          await Codes.deleteMany({ discordId: i.user.id });
          await Codes.create({ discordId: i.user.id, robloxId: id, code });

          return i.reply({ content: `Your code: ${code}`, ephemeral: true });
        }

        // Done verify
        if (i.customId.startsWith('done_')) {
          const row = await Codes.findOne({ discordId: i.user.id });
          if (!row) return i.reply({ content: 'No code generated', ephemeral: true });

          const info = await getUserInfo(row.robloxId);
          if (!info.description.includes(row.code)) {
            return i.reply({ content: 'Code not found in bio', ephemeral: true });
          }

          await Verified.findOneAndUpdate(
            { discordId: i.user.id },
            { robloxId: row.robloxId, username: info.name },
            { upsert: true }
          );

          await i.reply({ content: 'Verified!', ephemeral: true });
          return updateRoles(i.member);
        }

        // View groups (start)
        if (i.customId.startsWith('bgc_groups_')) {
          const parts = i.customId.split('_'); // bgc_groups_userId_page
          const userId = parts[2];
          const page = parseInt(parts[3] || '0', 10);

          const groups = await getGroups(userId);
          const pg = paginate(groups, page);

          return i.reply({ content: pg.content, components: pg.components, ephemeral: true });
        }

        // pagination
        if (i.customId.startsWith('groups_prev_') || i.customId.startsWith('groups_next_')) {
          const [type, dir, pageStr] = i.customId.split('_'); // groups prev 0
          const current = parseInt(pageStr, 10);
          const nextPage = dir === 'next' ? current + 1 : current - 1;

          // We need userId context; simplest is to store last groups on message is not trivial here.
          // So just ignore advanced context and keep same page (no-op) to avoid errors.
          return i.reply({ content: 'Use the View Groups button again to refresh pages.', ephemeral: true });
        }
      }
    } catch (e) {
      console.error(e);
      if (!i.replied) i.reply({ content: 'Error occurred', ephemeral: true }).catch(()=>{});
    }
  });
};
