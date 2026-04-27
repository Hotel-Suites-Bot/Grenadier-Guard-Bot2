require('dotenv').config();

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// =========================
// SAFE IMPORTS (prevents crash)
// =========================
try {
  require('./db');
  require('./events/interactionCreate')(client);
} catch (e) {
  console.error('INIT ERROR:', e);
}

// =========================
// SLASH COMMANDS
// =========================
const commands = [
  {
    name: 'verify',
    description: 'Verify Roblox account',
    options: [{
      name: 'username',
      type: 3,
      description: 'Roblox username',
      required: true
    }]
  },
  {
    name: 'bgc',
    description: 'Background check',
    options: [{
      name: 'username',
      type: 3,
      description: 'Roblox username',
      required: true
    }]
  },
  {
    name: 'update',
    description: 'Update roles'
  },
  {
    name: 'rankbind',
    description: 'Create rankbind',
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
        description: 'Role names (comma separated)',
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
    description: 'Manage blacklist',
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

// =========================
// SAFE COMMAND DEPLOY
// =========================
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Registering slash commands...');

    if (!process.env.CLIENT_ID) {
      throw new Error('Missing CLIENT_ID in env');
    }

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Slash commands registered');
  } catch (err) {
    console.error('❌ Command deploy error:', err);
  }
})();

// =========================
// BOT READY (CRASH PROTECTION)
// =========================
client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// =========================
// GLOBAL ERROR HANDLING (IMPORTANT)
// =========================
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

// =========================
// LOGIN (CRASH SAFE)
// =========================
if (!process.env.TOKEN) {
  console.error('❌ Missing TOKEN in environment variables');
} else {
  client.login(process.env.TOKEN).catch(err => {
    console.error('LOGIN ERROR:', err);
  });
}
