require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember]
});

require('./db');
require('./events/interactionCreate')(client);

// Auto update on join
const updateRoles = require('./utils/updateRoles');
client.on('guildMemberAdd', async (member) => {
  await updateRoles(member);
});

client.login(process.env.TOKEN);
