const verify = require('../commands/verify');
const bgc = require('../commands/bgc');
const update = require('../commands/update');
const rankbind = require('../commands/rankbind');
const blacklist = require('../commands/blacklist');

module.exports = (client) => {
  client.on('interactionCreate', async (i) => {
    try {
      if (!i.isChatInputCommand()) return;

      await i.deferReply({ ephemeral: true });

      switch (i.commandName) {
        case 'verify':
          return await verify(i);

        case 'bgc':
          return await bgc(i);

        case 'update':
          return await update(i);

        case 'rankbind':
          return await rankbind(i);

        case 'blacklist':
          return await blacklist(i);
      }

    } catch (err) {
      console.error(err);

      if (!i.replied) {
        await i.reply({
          content: "Error occurred.",
          ephemeral: true
        });
      }
    }
  });
};
