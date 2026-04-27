require('dotenv').config();

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// Load DB + events
require('./db');
require('./events/interactionCreate')(client);

// =========================
// SLASH COMMANDS (AUTO DEPLOY)
// =========================

const commands = [
  {
    name: 'verify',
    description: 'Verify Roblox account',
    options: [
      {
        name: 'username',
        type: 3,
        description: 'Roblox username',
        required: true
      }
    ]
  },
  {
    name: 'bgc',
    description: 'Background check',
    options: [
      {
        name: 'username',
        type: 3,
        description: 'Roblox username',
        required: true
      }
    ]
  },
  {
    name: 'update',
    description: 'Update roles and nickname'
  },
  {
    name: 'rankbind',
    description: 'Create rankbind (group role → Discord roles + nickname)',
    options: [
      {
        name: 'groupid',
        type: 3,
        description: 'Roblox group ID',
        required: true
      },
      {
        name: 'rolenames',
        type: 3,
        description: 'Group role names (comma separated)',
        required: true
      },
      {
        name: 'roles',
        type: 3,
        description: 'Discord role IDs (comma separated)',
        required: true
      },
      {
        name: 'nickname',
        type: 3,
        description: 'Nickname format',
        required: true
      }
    ]
  },
  {
    name: 'blacklist',
    description: 'Blacklist group management',
    options: [
      {
        name: 'action',
        type: 3,
        description: 'add or remove',
        required: true
      },
      {
        name: 'groupid',
        type: 3,
        description: 'Roblox group ID',
        required: true
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Register commands on startup
(async () => {
  try {
    console.log('🔄 Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Slash commands registered successfully');
  } catch (err) {
    console.error('❌ Command registration error:', err);
  }
})();

// =========================
// BOT READY
// =========================

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// =========================
// LOGIN
// =========================

client.login(process.env.TOKEN);
