const axios = require('axios');

async function getUserId(username) {
  const res = await axios.post(
    'https://users.roblox.com/v1/usernames/users',
    { usernames: [username] }
  );

  return res.data.data[0]?.id || null;
}

async function getGroups(userId) {
  const res = await axios.get(
    `https://groups.roblox.com/v2/users/${userId}/groups/roles`
  );

  return res.data.data;
}

module.exports = { getUserId, getGroups };
