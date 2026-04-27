require('dotenv').config();
const { REST, Routes } = require('discord.js');

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

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Deploying commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Commands deployed!');
  } catch (err) {
    console.error(err);
  }
})();
